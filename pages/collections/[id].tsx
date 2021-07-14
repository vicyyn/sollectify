import { GetServerSideProps } from 'next'
import Collection from '../../components/Collection'
import axios from 'axios'

export default function Home({ id, nfts }: any) {

  return (
    <>
      <Collection nfts={nfts} title={id} full={true} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const nfts = await axios.get(`http://localhost:3000/api/collections/${ctx.query.id}`)
    .then(({ data }) => data)
    .catch(() => null)
    
  return {
    props: {
      nfts,
      id: ctx.query.id
    }
  }
}
