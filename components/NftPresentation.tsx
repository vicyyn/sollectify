import type { AssetInterface } from '../utils/types/Asset'
import { Asset } from '../utils/types/Asset'
import Container from './Container'
import Details from './NftPage/Details'
import PriceHistory from './NftPage/PriceHistory'
import Offers from './NftPage/Offers'
import { useEffect, useState } from 'react'
import Overview from './NftPage/Overview'
import { getOwner } from '../utils/blockchain'


type props = {
	nft: AssetInterface
}
const NftPresentation = ({ nft }: props ) => {
	const data = new Asset(nft)
	const [owner, setOwner] = useState(undefined)
	useEffect(() => {
		(async () => {
			const owner = await getOwner(data.token)
			setOwner(owner)
		})()
	}, [owner])
	return (
		<Container>
			<div className='text-white grid-nft-page gap-9 pt-11 pb-80' >
				<div className='nft-page-left flex flex-col items-center gap-y-11' > {/* Left */}
					<img src={data.image} alt={data.id} className='rounded-lg' width='343' height='382' />
					<Details
						token={data.token}
						ipfs={data.ipfs}
						market={data.market}
						tags={data.tags}
					/>
				</div>
				<div className='nft-page-right flex flex-col gap-y-11' > {/* Right */}
					<Overview
						_ownerToken={owner} 
						id={data.id} title={data.title} creator={data.creator}
						collection={data.collections} details={data.details} likes={data.likes} price={data.price}
					/>
					<Offers />
					<PriceHistory priceHistory={data.priceHistory} />
				</div>
			</div>
		</Container>
	)
}

export default NftPresentation
