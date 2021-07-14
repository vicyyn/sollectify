
export type User = {
    name: string,
    image: string
}

export type Offer = {
    from: User,
    price:number,
    expiration?: any
}

export interface AssetInterface {
    ipfs: string,
    token: string,
    market: string,
    id: string,
    price: number,
    likes?: number,
    title: string,
    collections: string,
    details: string,
    priceHistory?: any,
    tags?: string[],
    creator: User,
}

export class Asset implements AssetInterface {
    constructor (private data) {}
    get ipfs() { return this.data.ipfs }
    get token() { return this.data.token } /* `https://explorer.solana.com/address/${this._token}/?cluster=devnet` */
    get market() { return this.data.market }
    get id() { return this.data._id }
    get image() { return `https://ipfs.io/ipfs/${this.data.ipfs}` }
    get price() { return this.data.price }
    get likes() { return this.data.likes }
    get title() { return this.data.title }
    get creator() { return this.data.creator }
    get collections() { return this.data.collections }
    get details() { return this.data.details }
    get priceHistory() { return null } 
    get tags() { return this.data.tags }
} 