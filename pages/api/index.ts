import { connect, Nfts } from '../../utils/db'

export default async function handler(_, res) {  
    await connect()
    // await Nfts.remove({})
    // await init()
    const nfts = await Nfts.find({})
    
    return res.json(nfts)
}