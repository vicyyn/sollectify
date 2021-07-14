import Card from '../Card'
import Button from '../Button'
import { useState, useEffect } from 'react'
import { get_bids, placeOrder } from '../../utils/blockchain'
import { displayPublicKey } from '../../utils'
import { useWallet } from '../../utils/wallet'
import { Connection, PublicKey } from '@solana/web3.js'
import { Market } from '@project-serum/serum'
import { getTokenAddress } from '../../utils/blockchain/get_token_address'

const From = ({ name, image }) => (
	<td className='flex items-center gap-x-2 my-1' >
		<img alt={image} width="30" height="30" src={image} />
		<h1 title={name} className='text-dark-5 dark:text-light-4 text-lg font-semibold font-raleway' >
			{displayPublicKey(name)}
		</h1>
	</td>
)
const Expiration = ({ exp }) => <td className='flex items-center justify-center' >{
	exp ? 'EXP' : (
		<>
			<img className='block dark:hidden' alt='Infinity' src='/b-infini.png' width='48' height='21' />
			<img className='hidden dark:block' alt='Infinity' src='/w-infini.png' width='48' height='21' />
		</>
	)	
}</td>
const Price = ({ price }) => <td><h1 className='text-center text-dark-5 dark:text-light-4 text-lg font-semibold font-raleway' >{price} SOL</h1></td>

const BidsController = () => {
	return (
		<td>
			X
		</td>
	)
}

const Offers = () => {
	const [bids, setBids] = useState([])
	const { publicKey, wallet } = useWallet()
	useEffect(() => {
		(async () => {
			const _bids = await get_bids('6fc7v3PmjZG9Lk2XTot6BywGyYLkBQuzuFKd4FpCsPxk')
			setBids(_bids.map(({ pubkey, price }) => ({ 
				pubkey, price, expiration: null, isMe: pubkey === publicKey 
			})))
		})()
	}, [])
	const handleMakeOffer = async () => {
		console.log('Making Offer')
	
		let connection = new Connection("https://api.mainnet-beta.solana.com")
		let marketAddress = new PublicKey("6fc7v3PmjZG9Lk2XTot6BywGyYLkBQuzuFKd4FpCsPxk")
		let programId = new PublicKey("9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin")
		let market = await Market.load(connection, marketAddress,{},programId);
		let baseCurrencyAccount = await getTokenAddress(wallet.publicKey.toBase58(),market.baseMintAddress.toBase58())
		let quoteCurrencyAccount = await getTokenAddress(wallet.publicKey.toBase58(),market.quoteMintAddress.toBase58())
		console.log(baseCurrencyAccount)
		console.log(quoteCurrencyAccount)
		if(baseCurrencyAccount) baseCurrencyAccount = new PublicKey(baseCurrencyAccount)
		if(quoteCurrencyAccount) quoteCurrencyAccount = new PublicKey(quoteCurrencyAccount)
		let feeDiscountPubkey = null
		await placeOrder({
			side:"buy",    
			price:0.5,
			size:1,
			orderType:"limit",
			market,
			connection,
			wallet,
			baseCurrencyAccount,
			quoteCurrencyAccount,
			feeDiscountPubkey
		   }
		)
	}
	return (
		<Card title='Offers' >
			<div className='flex flex-col justify-center items-center' >
				<div className='w-full overflow-y-auto h-32 my-4' >
					<table className='w-full table-auto text-center mb-7' > 
						<thead>
							<tr>
							<th className='text-left' >From</th>
							<th>Price</th>
							<th>Expiration</th>
							<th></th>
							</tr>
						</thead>
						<tbody>
							{bids.length === 0 
								? <tr><td colSpan={3} className='text-center' >Getting</td></tr>
								: bids.map(({ pubkey, price, expiration, isMe }, idx) => (
								<tr key={`${pubkey}-${price}-${idx}`} >
									<From name={pubkey} image='/img/profile1.png' />
									<Price price={price} />
									<Expiration exp={expiration} />
									{isMe ? <BidsController /> : null}
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<Button 
					tw='font-quicksand tracking-wider border border-sollectify-pink dark:border-transparent text-pink dark:text-extra-1 hover:text-hovers-pink dark:hover:text-hovers-extra bg-white dark:bg-dark-0 hover:bg-hovers-white dark:hover:bg-dark-6' size='text-base' shadow='shadow-none' weight='font-bold' 
					onClick={handleMakeOffer}
				>
					Make Offer
				</Button>
			</div>
		</Card>
	)
}

export default Offers