import Card from '../Card'

const Item = ({ children }) => <h1 className='mr-3 font-raleway font-extrabold text-dark-5 dark:text-light-1 flex items-center' style={{ fontSize: '1.1875rem' }} >{children}</h1>
const Hash = ({ children }) => <span className='overflow-hidden ml-3 font-raleway font-normal text-dark-2 dark:text-white' >{children}</span>
const Tag = ({ children }) => <span className='font-quicksand font-bold text-sm p-2 rounded bg-sollectify-pink dark:bg-extra-1 text-white dark:text-dark-2' >{children}</span>
const Tags = ({ tags }) => (
	<div className='ml-3 flex gap-3 flex-wrap items-center' >
		{tags.map(tag => <Tag key={tag} >{tag}</Tag>)}
	</div>
)

const Details = ({ token, ipfs, market, tags }) => {
	return (
		<Card title='Details' >
			<div className='flex flex-col' style={{ gap: '1.6875rem' }} >
				<Item>Token: <Hash>{token}</Hash></Item>
				<Item>IPFS: <Hash>{ipfs}</Hash></Item>
				<Item>Market: <Hash>{market}</Hash></Item>
				<Item>Tags: <Tags tags={tags}/> </Item>
			</div>
		</Card>
	)
}

export default Details
/*
*/