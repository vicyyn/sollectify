import Link from 'next/link'
	
const Button = ({ tw, href, children }) => {
	return (
		<Link href='/' >
            <a className={`font-semibold h-10 rounded tracking-wider text-base transition duration-250 grid place-content-center focus:outline-none shadow4_2 ${tw}`} 
				style={{ lineHeight: '1.1875rem', width: '8.6875rem',  }}
			>
                {children}
            </a>
        </Link>
		)
}

const Hero = () => {
    return (
        <div className='relative bg-black overflow-hidden' > 
			<img src='/img/hero.png' title='Photo by JJ Ying on Unsplash' className='absolute top-0 h-full left-0 opacity-60 w-full' />
			<div className='relative h-full flex flex-col items-center z-10 py-20 md:py-44 ' >
				<h1 className='font-draleway font-black text-white'
					style={{ fontSize: '3.3125rem', lineHeight: '3.875rem' }}
				>
					Sollectify
				</h1>
				<h1 className='font-normal text-white mb-3'
					style={{ fontSize: '1.375rem', lineHeight: '1.625rem' }}
				>
					NFT marketplace for creators
				</h1>
				<div className='flex gap-x-5' >

					<Button href='/' tw='text-white bg-pink hover:bg-hovers-pink'>
						EXPLORE
					</Button>

					<Button href='/' tw='text-pink bg-white hover:bg-hovers-white' >
						CREATE
					</Button>
				</div>
			</div>
        </div>
    )
}

export default Hero