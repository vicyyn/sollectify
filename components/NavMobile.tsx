import Logo from './Logo'
import SearchBar from './SearchBar'
import ConnectWallet from './ConnectWallet'
import HamburgerMenu from './HamburgerMenu'

const Nav = () => {
    return (
        <nav className='flex md:hidden flex-col justify-center items-center' >
            <div className='w-full p-4 flex items-center gap-x-5' >
                <Logo />
                <div className='mr-auto' ></div>
                <ConnectWallet />
                <HamburgerMenu />
            </div>
			<div className='w-full h-px' style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }} ></div>

            <div className='p-4 w-full' >
                <SearchBar />
            </div>
        </nav>
    )
}

export default Nav