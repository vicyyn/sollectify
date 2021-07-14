import { Market, OpenOrders,TOKEN_MINTS } from "@project-serum/serum";
import { PublicKey, Connection, AccountInfo, Transaction, Account } from "@solana/web3.js";
import { WalletAdapter } from "../wallet/walletSetup";
import { createTokenAccountTransaction ,sendTransaction} from "./place_order";

export interface TokenAccount {
	pubkey: PublicKey;
	account: AccountInfo<Buffer> | null;
	effectiveMint: PublicKey;
}

async function settle_funds({
	market,
	openOrders,
	connection,
	wallet,
	baseCurrencyAccount,
	quoteCurrencyAccount,
	sendNotification = true,
}: {
	market: Market;
	openOrders: OpenOrders;
	connection: Connection;
	wallet: WalletAdapter;
	baseCurrencyAccount: TokenAccount;
	quoteCurrencyAccount: TokenAccount;
	sendNotification?: boolean,
}): Promise<string | undefined> {
	if (
		!market ||
		!wallet ||
		!connection ||
		!openOrders ||
		(!baseCurrencyAccount && !quoteCurrencyAccount)
	) {
		if (sendNotification) {
			//notify({ message: 'Not connected' });
		}
		return;
	}

	let createAccountTransaction: Transaction | undefined;
	let createAccountSigner: Account | undefined;
	let baseCurrencyAccountPubkey = baseCurrencyAccount?.pubkey;
	let quoteCurrencyAccountPubkey = quoteCurrencyAccount?.pubkey;

	if (!baseCurrencyAccountPubkey) {
		const result = await createTokenAccountTransaction({
			connection,
			wallet,
			mintPublicKey: market.baseMintAddress,
		});
		baseCurrencyAccountPubkey = result?.newAccountPubkey;
		createAccountTransaction = result?.transaction;
		createAccountSigner = result?.signer;
	}
	if (!quoteCurrencyAccountPubkey) {
		const result = await createTokenAccountTransaction({
			connection,
			wallet,
			mintPublicKey: market.quoteMintAddress,
		});
		quoteCurrencyAccountPubkey = result?.newAccountPubkey;
		createAccountTransaction = result?.transaction;
		createAccountSigner = result?.signer;
	}
	let referrerQuoteWallet: PublicKey | null = null;
	if (market.supportsReferralFees) {
		const usdt = TOKEN_MINTS.find(({ name }) => name === 'USDT');
		const usdc = TOKEN_MINTS.find(({ name }) => name === 'USDC');
		if (
			process.env.REACT_APP_USDT_REFERRAL_FEES_ADDRESS &&
			usdt &&
			market.quoteMintAddress.equals(usdt.address)
		) {
			referrerQuoteWallet = new PublicKey(
				process.env.REACT_APP_USDT_REFERRAL_FEES_ADDRESS,
			);
		} else if (
			process.env.REACT_APP_USDC_REFERRAL_FEES_ADDRESS &&
			usdc &&
			market.quoteMintAddress.equals(usdc.address)
		) {
			referrerQuoteWallet = new PublicKey(
				process.env.REACT_APP_USDC_REFERRAL_FEES_ADDRESS,
			);
		}
	}
	const {
		transaction: settleFundsTransaction,
		signers: settleFundsSigners,
	} = await market.makeSettleFundsTransaction(
		connection,
		openOrders,
		baseCurrencyAccountPubkey,
		quoteCurrencyAccountPubkey,
		referrerQuoteWallet,
	);

	let transaction = mergeTransactions([
		createAccountTransaction,
		settleFundsTransaction,
	]);
	let signers = createAccountSigner
		? [...settleFundsSigners, createAccountSigner]
		: settleFundsSigners;

	return await sendTransaction({
		transaction,
		signers,
		wallet,
		connection,
		sendingMessage: 'Settling funds...',
	});
}

export async function settleFunds(wallet: WalletAdapter) {
	let connection = new Connection("https://api.mainnet-beta.solana.com")
	let marketAddress = new PublicKey("6fc7v3PmjZG9Lk2XTot6BywGyYLkBQuzuFKd4FpCsPxk")
	let programId = new PublicKey("9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin")
	let market = await Market.load(connection, marketAddress,{},programId);
	//let baseCurrencyAccount = await getTokenAddress(wallet.publicKey.toBase58(),market.baseMintAddress.toBase58())
	//let quoteCurrencyAccount = await getTokenAddress(wallet.publicKey.toBase58(),market.quoteMintAddress.toBase58())

	let orders = await OpenOrders.findForMarketAndOwner(
		connection,
		marketAddress,
		wallet.publicKey,
		programId
	)
	let order = orders[0]
	await settle_funds({
		market,
		openOrders:order,
		connection,
		wallet,

	})
}