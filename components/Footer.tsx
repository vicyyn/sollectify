import Link from 'next/link'
import Newsletter from './Newsletter'
import Logo from './Logo'
import { Discord, Twitter, Telegram } from './Vectors'

type MenuArgs = {
    className?: string,
    title: string,
    children: any
}

const Menu = ({ className, title, children }: MenuArgs) => {
    return (
        <menu
            className={`m-0 p-0 text-white text-base font-bold ${className ? className : ''} flex flex-col items-start`} >
            <h1 className='mb-7' >{title}</h1>
            {children}
        </menu>
    )
}

const Footer = () => {
    return (
        <footer className='bg-dark-2' >
            <Newsletter />
            <div
                className={`
                px-6 md:px-20 py-20 text-white text-sm md:text-base font-medium
                grid grid-cols-1 md:grid-cols-2 gap-8
                `} >
                <div className='mr-auto' style={{ maxWidth: '34.5rem' }} >
                    <Logo footer={true} />
                    <p className='mt-5 mb-4' >
                        Sollectify is a creator-centric NFT marketplace where users on the platform
                        can easily create, trade and sell non-fungible tokens (NFTs) for their unique
                        digital items like artworks, game items and more.
                    </p>
                    <p> Built on @solana ☀️ and @ProjectSerum </p>
                </div>
                <div className='w-4/5 md:w-full flex justify-between md:justify-evenly items-start flex-wrap' >
                    <Menu title='Sollectify' >
                        <Link href='/' >
                            <a className='mb-5 opacity-50' >Explore</a>
                        </Link>
                        <Link href='/' >
                            <a className='mb-5 opacity-50' >How it works</a>
                        </Link>
                        <Link href='/' >
                            <a className='mb-5 opacity-50' >Create</a>
                        </Link>
                        <Link href='/' >
                            <a className='mb-5 opacity-50' >Support</a>
                        </Link>
                    </Menu>
                    <Menu title='Community' >
                        <Link href='/' >
                            <a className='mb-5 opacity-50 flex justify-start items-center gap-x-2' >
                                <Discord className='w-4 h-4 text-white opacity-50' />
                                Discord
                            </a>
                        </Link>
                        <Link href='/' >
                            <a className='mb-5 opacity-50 flex justify-start items-center gap-x-2' >
                                <Twitter className='w-4 h-4 text-white opacity-50' />
                                Twitter
                            </a>
                        </Link>
                        <Link href='/' >
                            <a className='mb-5 opacity-50 flex justify-start items-center gap-x-2' >
                                <Telegram className='w-4 h-4 text-white opacity-50' />
                                Telegram
                            </a>
                        </Link>
                    </Menu>
                </div>
            </div>
        </footer>
    )
}

export default Footer
/*
Footer
    footer
        -- height: 348px;
        -- padding: x-88

        links
            -- ml: 189
            list1
            list2
                same
                link - gap-x-2





*/
