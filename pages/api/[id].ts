import { connect, Nfts } from '../../utils/db'

export default async function handler(req, res) {
    await connect()
    const { id } = req.query
    const nft = await Nfts.findById(id).lean()
    return res.json(nft)
}