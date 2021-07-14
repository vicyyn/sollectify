import { useState } from 'react'
import Button from './Button'

const Newsletter = () => {
    const [email, setEmail] = useState('')

    return (
        <div className='py-14 flex flex-col items-center' >
            <h1 style={{ letterSpacing: '-0.03rem' }} className='font-quicksand text-base md:text-xl font-semibold text-white mb-5' >
                Get the latest updates from Sollectify
            </h1>
            <div
                className='shadow-4_2 overflow-hidden flex justify-between items-center w-223125 md:w-23rem h-3125 md:h-14 bg-white rounded-3xl'
				style={{ boxShadow: '0px 3px 3px #00FFBD', width: '', borderRadius: '1.875rem' }}
            >
                <input
                    value={email}
                    placeholder='email@example.com'
                    onChange={e => setEmail(e.target.value)}
                    className='font-raleway text-base placeholder-dark-2 px-6 focus:outline-none'
                />
				<button 
					className='transition duration-250 shadow-4_2 grid place-content-center w-14 h-14 bg-extra-1 hover:bg-hovers-extra' 
					style={{ borderRadius: '0.3rem 0 0 1.5rem' }}
				>
					<img src='/send.png' className='w-12 h-11' />
				</button>
            </div>
        </div>
    )
}

export default Newsletter
