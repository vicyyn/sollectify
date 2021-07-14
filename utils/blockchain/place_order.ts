import { PublicKey, Connection, Transaction, Account, SystemProgram, TransactionSignature, SimulatedTransactionResponse, Commitment, RpcResponseAndContext } from "@solana/web3.js";
import { Market, TokenInstructions } from "@project-serum/serum"
import { WalletAdapter } from "../wallet/walletSetup";

const DEFAULT_TIMEOUT = 15000;

export async function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function simulateTransaction(
	connection: Connection,
	transaction: Transaction,
	commitment: Commitment,
): Promise<RpcResponseAndContext<SimulatedTransactionResponse>> {
	// @ts-ignore
	transaction.recentBlockhash = await connection._recentBlockhash(
		// @ts-ignore
		connection._disableBlockhashCaching,
	);

	const signData = transaction.serializeMessage();
	// @ts-ignore
	const wireTransaction = transaction._serialize(signData);
	const encodedTransaction = wireTransaction.toString('base64');
	const config: any = { encoding: 'base64', commitment };
	const args = [encodedTransaction, config];

	// @ts-ignore
	const res = await connection._rpcRequest('simulateTransaction', args);
	if (res.error) {
		throw new Error('failed to simulate transaction: ' + res.error.message);
	}
	return res.result;
}

export async function signTransaction({
	transaction,
	wallet,
	signers = [],
	connection,
}: {
	transaction: Transaction;
	wallet: any;
	signers?: Array<Account>;
	connection: Connection;
}) {
	transaction.recentBlockhash = (
		await connection.getRecentBlockhash('max')
	).blockhash;
	transaction.setSigners(wallet.publicKey, ...signers.map((s) => s.publicKey));
	if (signers.length > 0) {
		transaction.partialSign(...signers);
	}
	return await wallet.signTransaction(transaction);
}

export async function sendTransaction({
	transaction,
	wallet,
	signers = [],
	connection,
	sendingMessage = 'Sending transaction...',
	sentMessage = 'Transaction sent',
	successMessage = 'Transaction confirmed',
	timeout = DEFAULT_TIMEOUT,
}: {
	transaction: Transaction;
	wallet: any;
	signers?: Array<Account>;
	connection: Connection;
	sendingMessage?: string;
	sentMessage?: string;
	successMessage?: string;
	timeout?: number;
}) {
	const signedTransaction = await signTransaction({
		transaction,
		wallet,
		signers,
		connection,
	});
	return await sendSignedTransaction({
		signedTransaction,
		connection,
		sendingMessage,
		sentMessage,
		successMessage,
		timeout,
	});
}

async function awaitTransactionSignatureConfirmation(
	txid: TransactionSignature,
	timeout: number,
	connection: Connection,
) {
	let done = false;
	const result = await new Promise((resolve, reject) => {
		(async () => {
			setTimeout(() => {
				if (done) {
					return;
				}
				done = true;
				console.log('Timed out for txid', txid);
				reject({ timeout: true });
			}, timeout);
			try {
				connection.onSignature(
					txid,
					(result) => {
						console.log('WS confirmed', txid, result);
						done = true;
						if (result.err) {
							reject(result.err);
						} else {
							resolve(result);
						}
					},
					'recent',
				);
				console.log('Set up WS connection', txid);
			} catch (e) {
				done = true;
				console.log('WS error in setup', txid, e);
			}
			while (!done) {
				// eslint-disable-next-line no-loop-func
				(async () => {
					try {
						const signatureStatuses = await connection.getSignatureStatuses([
							txid,
						]);
						const result = signatureStatuses && signatureStatuses.value[0];
						if (!done) {
							if (!result) {
								console.log('REST null result for', txid, result);
							} else if (result.err) {
								console.log('REST error for', txid, result);
								done = true;
								reject(result.err);
							} else if (!result.confirmations) {
								console.log('REST no confirmations for', txid, result);
							} else {
								console.log('REST confirmation for', txid, result);
								done = true;
								resolve(result);
							}
						}
					} catch (e) {
						if (!done) {
							console.log('REST connection error: txid', txid, e);
						}
					}
				})();
				await sleep(300);
			}
		})();
	});
	done = true;
	return result;
}

export async function sendSignedTransaction({
	signedTransaction,
	connection,
	sendingMessage = 'Sending transaction...',
	sentMessage = 'Transaction sent',
	successMessage = 'Transaction confirmed',
	timeout = DEFAULT_TIMEOUT,
}: {
	signedTransaction: Transaction;
	connection: Connection;
	sendingMessage?: string;
	sentMessage?: string;
	successMessage?: string;
	timeout?: number;
}): Promise<string> {
	const rawTransaction = signedTransaction.serialize();
	const startTime = getUnixTs();
	// console.log({ message: sendingMessage });
	const txid: TransactionSignature = await connection.sendRawTransaction(
		rawTransaction,
		{
			skipPreflight: true,
		},
	);
	// console.log({ message: sentMessage, type: 'success', txid });

	console.log('Started awaiting confirmation for', txid);

	let done = false;
	(async () => {
		while (!done && getUnixTs() - startTime < timeout) {
			connection.sendRawTransaction(rawTransaction, {
				skipPreflight: true,
			});
			await sleep(300);
		}
	})();
	try {
		await awaitTransactionSignatureConfirmation(txid, timeout, connection);
	} catch (err) {
		if (err.timeout) {
			throw new Error('Timed out awaiting confirmation on transaction');
		}
		let simulateResult: SimulatedTransactionResponse | null = null;
		try {
			simulateResult = (
				await simulateTransaction(connection, signedTransaction, 'single')
			).value;
		} catch (e) { }
		if (simulateResult && simulateResult.err) {
			if (simulateResult.logs) {
				for (let i = simulateResult.logs.length - 1; i >= 0; --i) {
					const line = simulateResult.logs[i];
					if (line.startsWith('Program log: ')) {
						throw new Error(
							'Transaction failed: ' + line.slice('Program log: '.length),
						);
					}
				}
			}
			throw new Error(JSON.stringify(simulateResult.err));
		}
		throw new Error('Transaction failed');
	} finally {
		done = true;
	}
	//console.log({ message: successMessage, type: 'success', txid });

	console.log('Latency', txid, getUnixTs() - startTime);
	return txid;
}

export function getDecimalCount(value: any): number {
	if (
		!isNaN(value) &&
		Math.floor(value) !== value &&
		value.toString().includes('.')
	)
		return value.toString().split('.')[1].length || 0;
	if (
		!isNaN(value) &&
		Math.floor(value) !== value &&
		value.toString().includes('e')
	)
		return parseInt(value.toString().split('e-')[1] || '0');
	return 0;
}

export const getUnixTs = () => {
	return new Date().getTime() / 1000;
};

export async function createTokenAccountTransaction({
	connection,
	wallet,
	mintPublicKey,
}: {
	connection: Connection;
	wallet: WalletAdapter;
	mintPublicKey: PublicKey;
}): Promise<{
	transaction: Transaction;
	signer: Account;
	newAccountPubkey: PublicKey;
}> {
	const newAccount = new Account();
	const transaction = new Transaction();
	const instruction = SystemProgram.createAccount({
		fromPubkey: wallet.publicKey,
		newAccountPubkey: newAccount.publicKey,
		lamports: await connection.getMinimumBalanceForRentExemption(165),
		space: 165,
		programId: TokenInstructions.TOKEN_PROGRAM_ID,
	});
	transaction.add(instruction);
	transaction.add(
		TokenInstructions.initializeAccount({
			account: newAccount.publicKey,
			mint: mintPublicKey,
			owner: wallet.publicKey,
		}),
	);
	return {
		transaction,
		signer: newAccount,
		newAccountPubkey: newAccount.publicKey,
	};
}

export async function place_order({
	side,
	price,
	size,
	orderType,
	market,
	connection,
	wallet,
	baseCurrencyAccount,
	quoteCurrencyAccount,
	feeDiscountPubkey = undefined,
}: {
	side: 'buy' | 'sell';
	price: number;
	size: number;
	orderType: 'ioc' | 'postOnly' | 'limit';
	market: Market | undefined | null;
	connection: Connection;
	wallet: WalletAdapter;
	baseCurrencyAccount: PublicKey | undefined;
	quoteCurrencyAccount: PublicKey | undefined;
	feeDiscountPubkey: PublicKey | undefined;
}) {
	let formattedMinOrderSize =
		market?.minOrderSize?.toFixed(getDecimalCount(market.minOrderSize)) ||
		market?.minOrderSize;
	let formattedTickSize =
		market?.tickSize?.toFixed(getDecimalCount(market.tickSize)) ||
		market?.tickSize;
	const isIncrement = (num, step) =>
		Math.abs((num / step) % 1) < 1e-5 ||
		Math.abs(((num / step) % 1) - 1) < 1e-5;
	if (isNaN(price)) {
		console.log({ message: 'Invalid price', type: 'error' });
		return;
	}
	if (isNaN(size)) {
		console.log({ message: 'Invalid size', type: 'error' });
		return;
	}
	if (!wallet || !wallet.publicKey) {
		console.log({ message: 'Connect wallet', type: 'error' });
		return;
	}
	if (!market) {
		console.log({ message: 'Invalid  market', type: 'error' });
		return;
	}
	if (!isIncrement(size, market.minOrderSize)) {
		console.log({
			message: `Size must be an increment of ${formattedMinOrderSize}`,
			type: 'error',
		});
		return;
	}
	if (size < market.minOrderSize) {
		console.log({ message: 'Size too small', type: 'error' });
		return;
	}
	if (!isIncrement(price, market.tickSize)) {
		console.log({
			message: `Price must be an increment of ${formattedTickSize}`,
			type: 'error',
		});
		return;
	}
	if (price < market.tickSize) {
		console.log({ message: 'Price under tick size', type: 'error' });
		return;
	}
	const owner = wallet.publicKey;
	const transaction = new Transaction();
	const signers: Account[] = [];

	if (!baseCurrencyAccount) {
		const {
			transaction: createAccountTransaction,
			signer: createAccountSigners,
			newAccountPubkey,
		} = await createTokenAccountTransaction({
			connection,
			wallet,
			mintPublicKey: market.baseMintAddress,
		});
		transaction.add(createAccountTransaction);
		signers.push(createAccountSigners);
		baseCurrencyAccount = newAccountPubkey;
	}
	if (!quoteCurrencyAccount) {
		const {
			transaction: createAccountTransaction,
			signer: createAccountSigners,
			newAccountPubkey,
		} = await createTokenAccountTransaction({
			connection,
			wallet,
			mintPublicKey: market.quoteMintAddress,
		});
		transaction.add(createAccountTransaction);
		signers.push(createAccountSigners);
		quoteCurrencyAccount = newAccountPubkey;
	}

	const payer = side === 'sell' ? baseCurrencyAccount : quoteCurrencyAccount;
	if (!payer) {
		console.log({
			message: 'Need an SPL token account for cost currency',
			type: 'error',
		});
		return;
	}
	const params = {
		owner,
		payer,
		side,
		price,
		size,
		orderType,
		feeDiscountPubkey: feeDiscountPubkey || null,
	};
	console.log(params);

	const matchOrderstransaction = market.makeMatchOrdersTransaction(5);
	transaction.add(matchOrderstransaction);
	const startTime = getUnixTs();
	let {
		transaction: placeOrderTx,
		signers: placeOrderSigners,
	} = await market.makePlaceOrderTransaction(
		connection,
		params,
		120_000,
		120_000,
	);
	const endTime = getUnixTs();
	console.log(`Creating order transaction took ${endTime - startTime}`);
	transaction.add(placeOrderTx);
	transaction.add(market.makeMatchOrdersTransaction(5));
	signers.push(...placeOrderSigners);

	return await sendTransaction({
		transaction,
		wallet,
		connection,
		signers,
		sendingMessage: 'Sending order...',
	});
}
