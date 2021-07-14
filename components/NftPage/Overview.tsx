import Card from '../Card'
import Link from 'next/link'
import Button from '../Button'
import toDollar from '../../utils/toDollar'
import { useWallet } from '../../utils/wallet'
import { displayPublicKey } from '../../utils'
import { useState, useEffect } from 'react'
import { get_asks } from '../../utils/blockchain'


const Person = ({ person: { name }, link }: { person: { name: string | undefined }, link?: string }) => 
<div className='flex items-center gap-x-3' >
	<img alt={name} src='https://solana.com/static/992e0febee98f5383e32fd2ea8e794b2/cope.svg' className='w-10 h-10 rounded-full' />
	{
		link 
			? <Link href={link}>
					<a className='font-quicksand text-lg text-dark-2 dark:text-white' >
					{name ? name : 'Getting'}
					</a>
				</Link>
			: <h1 className='font-quicksand text-lg text-dark-2 dark:text-white' title={name} >
				{name ? displayPublicKey(name) : 'Getting..'}
			</h1>
	}
	
</div>

const Price = ({ price }) => {
	if (price > 0) return (
		<>
			<span className='font-primary text-pink dark:text-extra-1 font-semibold' >{price} SOL</span>
			<span className='text-dark-7' >{' '}({toDollar(price)}$)</span>
		</>
	)

	if (price == -1) return <>Getting..</>
	if (!price) return <>Not Listed</>
}


const Overview = ({ id, title, creator, _ownerToken, collection, details, likes }) => {

	const { isConnected } = useWallet()
	const [price, setPrice] = useState(-1)
	useEffect(() => {
		(async () => {
			const _asks = await get_asks('6fc7v3PmjZG9Lk2XTot6BywGyYLkBQuzuFKd4FpCsPxk')
			const _price = _asks?.[0]?.price
			setPrice(_price)
		})()
	}, [])

	return (
		<Card withHeader={false} >
			<h1 style={{ fontSize: '2rem' }} className='font-semibold text-black dark:text-white' >{title}</h1>

			<h1 className='mb-8 font-raleway font-medium text-dark-8 dark:text-white' >Current Price: <Price price={price} /></h1>
			
			<div className='w-full flex flex-wrap items-center justify-between' >
				<div>
					<h1 className='mb-3 text-xl font-raleway font-semibold text-dark-5 dark:text-light-5' >Creator</h1> 
					<Person person={creator} />
				</div>
				<div>
					<h1 className='mb-3 text-xl font-raleway font-semibold text-dark-5 dark:text-light-5' >Collection</h1> 
					<Person person={{ name: collection }} link={`/collections/${collection}`} />
				</div>
				<div>
					<h1 className='mb-3 text-xl font-raleway font-semibold text-dark-5 dark:text-light-5' >Owner</h1> 
					<Person person={{ name: _ownerToken }} />
				</div>
			</div>

			<div className='mt-16 pb-11' >
				<h1 className='mb-3 text-xl font-raleway font-semibold text-dark-5 dark:text-light-5' >Description</h1>
				<p className='text-light-6 dark:text-white' >{details}</p>
			</div>

			
			{isConnected 
			? (
				<Button tw='mx-auto font-quicksand tracking-wide text-white dark:text-dark-2 hover:text-hovers-white dark:hover:text-hovers-dark bg-pink dark:bg-extra-1 hover:bg-hovers-pink dark:hover:bg-hovers-extra' size='text-base' weight='font-bold' >
					Buy Now
				</Button>
			) : (
				<h1 className='text-center' >Connect your Wallet to Buy..</h1>
			)}
			
		</Card>
	)
}

export default Overview