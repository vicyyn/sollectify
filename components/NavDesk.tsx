import Link from 'next/link'
import ThemeSwitch from './ThemeSwitch'
import Logo from './Logo'
import SearchBar from './SearchBar'
import ConnectWallet from './ConnectWallet'

const Nav = () => {
    return (
        <nav className='hidden md:flex justify-between items-center px-6 md:px-11 py-5 border-b border-divider-2 dark:border-divider-1' >
            <div className='flex items-center w-full' >
                <Logo />
                <div className='w-4/5 px-9' ><SearchBar /></div>
            </div>

            <div className='flex items-center gap-x-8' >
                <Link href='/' >
                    <a className='font-medium text-lg text-dark-2 dark:text-white' >
                        Explore
                    </a>
                </Link>
                <ThemeSwitch tw='justify-center' />
                <ConnectWallet />
            </div>
        </nav>
    )
}

export default Nav

