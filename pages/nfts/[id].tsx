import { GetServerSideProps } from 'next'
import NftPresentation from '../../components/NftPresentation'
import Collection from '../../components/Collection'
import { AssetInterface } from '../../utils/types/Asset'
import axios from 'axios'

type NftPageProps = {
	nfts: AssetInterface[],
	nft: AssetInterface
}

export default function NftPage({ nft, nfts }: NftPageProps) {

  return (
    <>
      <NftPresentation nft={nft} />
      <Collection nfts={nfts} title='More from this collection' />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const nft = await axios.get(`http://localhost:3000/api/${ctx.query.id}`).then(({ data }) => data)
  const nfts = await axios.get(`http://localhost:3000/api/collections/${nft.collections}`).then(({ data }) => data).catch(() => null)
  
  return {
    props: {
		nft,
      nfts
    }
  }
}