import db from 'mongoose'
import Nfts from './nft'

let cached = global.mongoose
if (!cached) cached = global.mongoose = { conn: null, promise: null }

const URI = 'mongodb+srv://adm:x0vdTkIZzmr0uCMC@cluster0.5cgug.mongodb.net/db?retryWrites=true&w=majority'


const connect = async () => {
    if (cached.conn) return cached.conn

    if (!cached.promise) {
        const opts = {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          bufferCommands: false,
          bufferMaxEntries: 0,
          useFindAndModify: false,
          useCreateIndex: true,
        }
    
        cached.promise = db.connect(URI, opts)
            .then(() => console.log('>>>>>>>>>>>>>>>>>> connected'))
            .catch(console.error)
      }
      cached.conn = await cached.promise
      return cached.conn
}


const init = async () => {
	for (let x of defaultDatas) await Nfts.create(x)
}

export {
    connect,
    Nfts,
    init
}

const defaultDatas = [
    {
        ipfs: 'QmQFLzgtqhDtuQqjRX25xh1L2ABc9ibfUTw1NaD7DnHiTu',
        token: '8PjqxGhiXGFWMSBCdMKARgZ4ouFPaqDWYaXXukxZfjqd',
        market: '9v1onxiVvfBZ678MUDtmaMkqsgLGYZRxR13EWguAKQTY',
        price: 1.23,
        likes: 5,
        title: '$COPE',
        creator: { name: '$COPE Gang', image: 'https://solana.com/static/992e0febee98f5383e32fd2ea8e794b2/cope.svg' },
        owner: { name: '$COPE Gang', image: 'https://solana.com/static/992e0febee98f5383e32fd2ea8e794b2/cope.svg' },
        collections: 'COPE',
        details: 'A work of art, artwork, art piece, piece of art or art object is an artistic creation of aesthetic value. Except for "work of art", which may be used of any work regarded as art in its widest sense, including works from literature and music, these terms apply principally to tangible, physical forms of visual art',
        tags: ['COPE', 'NFT', 'Artwork'],
    },
    {
        ipfs: 'QmU1fNvwbHG49oaSdqptjBdNXbG1iwLupVNYvU2A762gLP',
        token: '8pNe7tgbM7CXyQYv838oDCK58m1sDMzGjAQZNnf1uxhJ',
        market: '9v1onxiVvfBZ678MUDtmaMkqsgLGYZRxR13EWguAKQTY',
        price: 785,
        likes: 1,
        title: 'gooseFx',
        creator: { name: 'gooseFx Team', image: 'https://pbs.twimg.com/profile_images/1394783657274003466/r75hiKW8_400x400.jpg' },
        owner: { name: 'gooseFx Team', image: 'https://pbs.twimg.com/profile_images/1394783657274003466/r75hiKW8_400x400.jpg' },
        collections: 'gooseFx',
        details: 'Peaceful describes something calm and tranquil, not at war. ... Peace comes from the Latin word pax meaning, "tranquility, absence of war."',
        tags: ['gooseFx', 'Ocean', 'Peace'],
    },
    {
        ipfs: 'QmQFLzgtqhDtuQqjRX25xh1L2ABc9ibfUTw1NaD7DnHiTu',
        token: '8PjqxGhiXGFWMSBCdMKARgZ4ouFPaqDWYaXXukxZfjqd',
        market: '9v1onxiVvfBZ678MUDtmaMkqsgLGYZRxR13EWguAKQTY',
        price: 1.23,
        likes: 5,
        title: 'COPE',
        creator: { name: '$COPE Gang', image: 'https://solana.com/static/992e0febee98f5383e32fd2ea8e794b2/cope.svg' },
        owner: { name: '$COPE Gang', image: 'https://solana.com/static/992e0febee98f5383e32fd2ea8e794b2/cope.svg' },
        collections: 'COPE',
        details: 'A work of art, artwork, art piece, piece of art or art object is an artistic creation of aesthetic value. Except for "work of art", which may be used of any work regarded as art in its widest sense, including works from literature and music, these terms apply principally to tangible, physical forms of visual art',
        tags: ['COPE', 'NFT', 'Artwork'],
    },
    {
        ipfs: 'QmU1fNvwbHG49oaSdqptjBdNXbG1iwLupVNYvU2A762gLP',
        token: '8pNe7tgbM7CXyQYv838oDCK58m1sDMzGjAQZNnf1uxhJ',
        market: '9v1onxiVvfBZ678MUDtmaMkqsgLGYZRxR13EWguAKQTY',
        price: 785,
        likes: 1,
        title: 'gooseFx',
        creator: { name: 'gooseFx Team', image: 'https://pbs.twimg.com/profile_images/1394783657274003466/r75hiKW8_400x400.jpg' },
        owner: { name: 'gooseFx Team', image: 'https://pbs.twimg.com/profile_images/1394783657274003466/r75hiKW8_400x400.jpg' },
        collections: 'gooseFx',
        details: 'Peaceful describes something calm and tranquil, not at war. ... Peace comes from the Latin word pax meaning, "tranquility, absence of war."',
        tags: ['gooseFx', 'Ocean', 'Peace'],
    },{
        ipfs: 'QmQFLzgtqhDtuQqjRX25xh1L2ABc9ibfUTw1NaD7DnHiTu',
        token: '8PjqxGhiXGFWMSBCdMKARgZ4ouFPaqDWYaXXukxZfjqd',
        market: '9v1onxiVvfBZ678MUDtmaMkqsgLGYZRxR13EWguAKQTY',
        price: 1.23,
        likes: 5,
        title: 'COPE',
        creator: { name: '$COPE Gang', image: 'https://solana.com/static/992e0febee98f5383e32fd2ea8e794b2/cope.svg' },
        owner: { name: '$COPE Gang', image: 'https://solana.com/static/992e0febee98f5383e32fd2ea8e794b2/cope.svg' },
        collections: 'COPE',
        details: 'A work of art, artwork, art piece, piece of art or art object is an artistic creation of aesthetic value. Except for "work of art", which may be used of any work regarded as art in its widest sense, including works from literature and music, these terms apply principally to tangible, physical forms of visual art',
        tags: ['COPE', 'NFT', 'Artwork'],
    },
    {
        ipfs: 'QmU1fNvwbHG49oaSdqptjBdNXbG1iwLupVNYvU2A762gLP',
        token: '8pNe7tgbM7CXyQYv838oDCK58m1sDMzGjAQZNnf1uxhJ',
        market: '9v1onxiVvfBZ678MUDtmaMkqsgLGYZRxR13EWguAKQTY',
        price: 785,
        likes: 1,
        title: 'gooseFx',
        creator: { name: 'gooseFx Team', image: 'https://pbs.twimg.com/profile_images/1394783657274003466/r75hiKW8_400x400.jpg' },
        owner: { name: 'gooseFx Team', image: 'https://pbs.twimg.com/profile_images/1394783657274003466/r75hiKW8_400x400.jpg' },
        collections: 'gooseFx',
        details: 'Peaceful describes something calm and tranquil, not at war. ... Peace comes from the Latin word pax meaning, "tranquility, absence of war."',
        tags: ['gooseFx', 'Ocean', 'Peace'],
    },
    {
        ipfs: 'QmQFLzgtqhDtuQqjRX25xh1L2ABc9ibfUTw1NaD7DnHiTu',
        token: '8PjqxGhiXGFWMSBCdMKARgZ4ouFPaqDWYaXXukxZfjqd',
        market: '9v1onxiVvfBZ678MUDtmaMkqsgLGYZRxR13EWguAKQTY',
        price: 1.23,
        likes: 5,
        title: 'COPE',
        creator: { name: '$COPE Gang', image: 'https://solana.com/static/992e0febee98f5383e32fd2ea8e794b2/cope.svg' },
        owner: { name: '$COPE Gang', image: 'https://solana.com/static/992e0febee98f5383e32fd2ea8e794b2/cope.svg' },
        collections: 'COPE',
        details: 'A work of art, artwork, art piece, piece of art or art object is an artistic creation of aesthetic value. Except for "work of art", which may be used of any work regarded as art in its widest sense, including works from literature and music, these terms apply principally to tangible, physical forms of visual art',
        tags: ['COPE', 'NFT', 'Artwork'],
    },
    {
        ipfs: 'QmU1fNvwbHG49oaSdqptjBdNXbG1iwLupVNYvU2A762gLP',
        token: '8pNe7tgbM7CXyQYv838oDCK58m1sDMzGjAQZNnf1uxhJ',
        market: '9v1onxiVvfBZ678MUDtmaMkqsgLGYZRxR13EWguAKQTY',
        price: 785,
        likes: 1,
        title: 'gooseFx',
        creator: { name: 'gooseFx Team', image: 'https://pbs.twimg.com/profile_images/1394783657274003466/r75hiKW8_400x400.jpg' },
        owner: { name: 'gooseFx Team', image: 'https://pbs.twimg.com/profile_images/1394783657274003466/r75hiKW8_400x400.jpg' },
        collections: 'gooseFx',
        details: 'Peaceful describes something calm and tranquil, not at war. ... Peace comes from the Latin word pax meaning, "tranquility, absence of war."',
        tags: ['gooseFx', 'Ocean', 'Peace'],
    },
]