import Link from 'next/link'

type Props = {
    tw?: string,
    href?: string,
    children: any,
    style?: object,
    size?: string,
	shadow?: string,
	weight?: string,
    onClick?: () => void
}

const Button = (props: Props) => {
    const { 
        tw, href, children, style, 
        size = 'text-lg', shadow = 'shadow-4_4', weight = 'font-semibold', onClick
    } = props
    const styling = `
    rounded ${tw} ${size} ${shadow} ${weight}
    transition duration-250 grid place-content-center w-32 h-10 focus:outline-none
    `

    if (href) return (
        <Link href={href}>
            <a className={styling} style={style} >
                {children}
            </a>
        </Link>
    )
    return (
        <button className={styling} style={style} onClick={onClick} >
            {children}
        </button>
    )
}

export default Button