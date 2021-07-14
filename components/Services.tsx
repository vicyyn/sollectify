import { Wallet, Tag, Picture } from './Vectors'

const Blue = props => <span className='text-sollectify-blue' {...props} />

const Service = ({ children, title, Icon }) => {
	return (
		<div className='text-center flex flex-col items-center justify-center text-dark-2 dark:text-white mb-4' >
			<div className='w-20 h-20 bg-pink mb-6 grid place-items-center rounded-full'><Icon className='text-white w-9 h-10' /></div>
			<h1 className='font-semibold text-xl mb-4' >{title}</h1>
			<div style={{ width: '16.5625rem' }} className='leading-6 font-medium' >
			{children}
			</div>
		</div>
	)
}

const Services = () => {
    return (
        <div className='md:pt-16 pb-28 text-white' >
			<h1 style={{ lineHeight: '2.375rem' }} className='text-2xl md:text-2rem font-semibold text-center text-dark-2 dark:text-white mb-16' >
				Get started creating & selling your NFTs
			</h1>
			
			<div className='flex gap-20 justify-center items-start flex-wrap' >
			
				<Service title="Setup your wallet" Icon={Wallet} >
					You need a Solana Program Library (SPL) wallet to connect to Sollectify. 
					We recommend <Blue>Sollet.io</Blue> and <Blue>Solong</Blue>.
				</Service>
				
				<Service title="Create your NFTs" Icon={Picture} >
					Click <Blue>Create</Blue> and upload your digital items.
				</Service>
				
				<Service title="List them for sale" Icon={Tag} >
					Choose how you want to sell your NFTs - auction, fixed price listings.
				</Service>
			
			</div>
			
        </div>
    )
}
export default Services