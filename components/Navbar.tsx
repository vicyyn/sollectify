import NavMobile from './NavMobile'
import NavDesk from './NavDesk'

const Navbar = () => {
    return (
        <div className='static z-50 w-full' >
            <NavMobile />
            <NavDesk />
        </div>
    )
}

export default Navbar
