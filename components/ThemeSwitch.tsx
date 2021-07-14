import { Moon, Sun } from './Vectors'
import { useTheme } from '../utils/context'

const Button = ({ tw, ...p }) => (
    <button className={`focus:outline-none transition duration-500 ${tw}`} {...p} />
)

const ThemeSwitch = ({ text, tw }: { text?: boolean, tw?: string }) => {
    const { theme, switchTheme } = useTheme()

    return (
        <>
            {theme === 'dark'
                ? (
                    <Button
                        onClick={switchTheme}
                        tw={`flex items-center gap-4 outline-none ${tw}`}
                    >
                        { text && 'Light Mode'}
                        <Sun className='w-6 h-6 text-white' />
                    </Button>
                ) : (
                    <Button
                        onClick={switchTheme}
                        tw={`flex items-center gap-4 ${tw}`}
                    >
                        { text && 'Dark Mode'}
                        <Moon className='w-6 h-6 text-dark-2' />
                    </Button>
                )
            }
        </>
    )
}

export default ThemeSwitch