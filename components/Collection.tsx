import Card from './AssetCard'
import Container from './Container'
import { AssetInterface } from '../utils/types/Asset'
import Link from 'next/link'

type AssetsCollection = {
	title: string,
    nfts: AssetInterface[],
	full?: boolean
}

const Collection = ({ title, nfts, full = false }: AssetsCollection) => {
    return (
		<Container>
			<div className='py-10 text-dark-1 dark:text-white' >
				<div className='pb-5 flex justify-between items-center' >
					<h2 className='font-semibold text-2xl' >{title}</h2>
					
					{ !full && 
						<Link href={`/collections/${title}`} >
							<a className='font-normal text-base'>View More →</a>
						</Link>
					}
				</div>

				<div className='flex flex-wrap items-center justify-between' >
					{nfts.map((nft, idx) => (
						full 
							? <Card key={idx} {...nft} />
							: idx < 4 ? <Card key={idx} {...nft} /> : null
					))}

				</div>
			</div>
		</Container>
    )
}

export default Collection
