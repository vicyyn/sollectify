import { createContext, useState, useContext, useCallback, useEffect } from 'react'
import { ThemeWrapper } from '../components/Theme'
const context = createContext(null)

const Theme = ({ children }) => {
    const { theme } = useContext(context)
    return (
        <ThemeWrapper theme={theme} >
            {children}
        </ThemeWrapper>
    )
}

const useTheme = () => {
    const { theme, setTheme } = useContext(context)
    const switchTheme = useCallback(() => {
        setTheme(theme => {
            const new_theme = theme === 'dark' ? '' : 'dark'
            localStorage.theme = new_theme
            return new_theme
        })
    }, [])
    return {
        theme,
        switchTheme
    }
}

const useNotification = () => {
    const { notify, setNotify } = useContext(context)
    return {
        notify, setNotify
    }
}


const Provider = ({ children }) => {
    const [theme, setTheme] = useState('dark')
    const [notify, setNotify] = useState('')
    useEffect(() => {
        const defaultTheme = (
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) ? 'dark' : ''
        setTheme(defaultTheme)
    }, [])
    return (
        <context.Provider value={{ theme, setTheme, notify, setNotify }} >
            {children}
        </context.Provider>
    )
}

export {
    Provider,
    Theme,
    useTheme,
    useNotification
}