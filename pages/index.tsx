import { GetServerSideProps } from 'next'
import Collection from '../components/Collection'
import Hero from '../components/HeroSection'
import Services from '../components/Services'
import axios from 'axios'

export default function Home({ nfts }: any) {

  return (
    <>
      <Hero />
      {Object.keys(nfts).map(collection => (
        <Collection nfts={nfts[collection]} title={collection} key={collection} />
      ))}
      <Services />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const nfts = await axios.get('http://localhost:3000/api/collections')
    .then(({ data }) => data)
    .catch(() => null)
    
  return {
    props: {
      nfts
    }
  }
}
