import { Nfts, connect } from '../../../utils/db'

export default async function handler(_, res) {
    await connect()
    let nfts
    nfts = await Nfts.find({}).lean()
    const data = {}
    nfts.forEach(nft => {
        let get = data[nft.collections] || []
        get.push(nft)
        data[nft.collections] = get
    })

    console.log(data)
    return res.json(data)
}