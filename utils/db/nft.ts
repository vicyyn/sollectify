import db from 'mongoose'

const Nfts = db.models.nft || db.model('nft', new db.Schema({
    ipfs: String,
    token: String,
    market: String,
    price: Number,
    title: String,
    creator: { name: String, image: String },
    owner: { name: String, image: String },
    collections: String,
    details: String,
    tags: [String],
}))

export default Nfts