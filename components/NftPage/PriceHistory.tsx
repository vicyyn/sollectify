import Card from '../Card'
import { No_Data } from '../Vectors'

const PriceHistory = ({ priceHistory }) => {
	return (
		<Card title='Price History' >
		{ priceHistory ? 'price History Content' : (
			<div className='flex flex-col justify-center items-center gap-y-4' >
				<No_Data className='text-dark-2 dark:text-white' />
				<h1 className='font-quicksand font-bold text-2xl text-light-2 dark:text-light-3' >No data yet</h1>
			</div>
		) }
		</Card>
	)
}

export default PriceHistory