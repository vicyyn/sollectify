

type CardProps = {
	children: any,
	title?: string,
	withHeader?: boolean
}

const Card = ({ children, title, withHeader = true }: CardProps) => {
	return (
		<div className='w-full box-border rounded-xl bg-white dark:bg-dark-4 shadow-4_10_4 border border-border-card-light' >
		{ withHeader && (
			<div className='py-4 px-8 border-b border-border-card-light dark:border-border-card-dark' >
				<h1 className='font-quicksand font-bold text-2xl text-dark-2 dark:text-white' >{title}</h1>
			</div>
		) }
			<div className='py-7 px-8 text-dark-2 dark:text-white' >{children}</div>
		</div>
	)
}

export default Card