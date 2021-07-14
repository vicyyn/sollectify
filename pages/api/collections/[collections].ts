import { Nfts, connect } from '../../../utils/db'

export default async function handler(req, res) {
    await connect()
    const { collections } = req.query
    const nfts = await Nfts.find({ collections: new RegExp(`^${collections}$`, "i") }).lean()
    return res.json(nfts)
}