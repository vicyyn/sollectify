import Link from 'next/link'

const Logo = ({ footer }: { footer?: boolean } ) => {
    return (
        <Link href='/' >
            <a className='flex justify-between items-center h-10' style={{ width: '7.875rem' }}>            
                <img className='h-10 w-10' src='/logo.png' alt='Logo' />
                <h1 className={`font-logo font-medium text-xl ${footer ? 'text-white' : 'text-dark-2 dark:text-white' }`} >
                    Sollectify
                </h1>
            </a>
        </Link>
    )
}

export default Logo