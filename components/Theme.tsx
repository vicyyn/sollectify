
const ThemeWrapper = ({ theme, children }) => {
    return (
        <div className={`${theme}`} >
            { children}
        </div>
    )
}


export {
    ThemeWrapper
}