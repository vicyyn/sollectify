import { Likes } from './Vectors'
import Link from 'next/link'
import { Asset, AssetInterface } from '../utils/types/Asset'

const Card = (nft: AssetInterface) => {
    const data = new Asset(nft)
    console.log(data)

    return (
        <Link href={`/nfts/${data.id}`} >
            <a className={`
                transition duration-250 sm:w-card w-full
                shadow-10_4 mb-4 rounded text-base overflow-hidden cursor-pointer
                bg-white hover:bg-hovers-white dark:bg-dark-2 dark:hover:bg-hovers-dark
            `} >
                <img
                    className='w-full shadow-10_4 h-card'
                    src={data.image}
                    alt={data.title}
                />
                <div className='mx-4 my-6' >
                    <h3 className='sm:text-xs text-sm font-normal text-dark-2 dark:text-white' >{data.creator.name}</h3>
                    <h2 className='sm:text-base text-lg font-semibold text-dark-2 dark:text-white' >
                        {data.title} <span className='text-sm font-medium' >#{data.collection}</span>
                    </h2>
                    <div className='flex justify-between items-center mt-8' >
                        <h4 className='font-bold text-pink dark:text-extra-1' >
                            {data.price} SOL
                        </h4>
                        <div className='text-sm sm:text-base font-semibold text-dark-2 dark:text-white flex items-center' >
                            <Likes className='w-4 sm:h-5 h-6 text-dark-2 dark:text-white mx-1' />
                            <h4>{data.likes}</h4>
                        </div>
                    </div>
                </div>
                <div
                    className='shadow-4_2 h-1 w-full'
                    style={{
                        background: 'linear-gradient(90.44deg, #63D5A1 -2.39%, #4056BA 53.45%, #C23ADF 99.19%)',
                    }}
                ></div>
            </a>
        </Link>
    )
}

export default Card


/*
Card
    gap: 1.5rem
*/