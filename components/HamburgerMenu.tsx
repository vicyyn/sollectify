import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react"
import ThemeSwitch from './ThemeSwitch'
import { Hamburger, Close } from './Vectors'

const Item = ({ children, defaults = true }) => {
	return (
		<Menu.Item>
		{defaults ? ({ active }) => (
			<button className={`text-dark-2 dark:text-white px-4 py-2 rounded w-full text-left ${active && 'bg-hovers-white dark:bg-hovers-dark'}`} >
				{children}
			</button>
		) : children }
        </Menu.Item>
	)
}


const HamburgerMenu = () => {
    return (
        <Menu as="div" className="relative inline-block text-left z-30">
            {({ open }) => (
                <>
                    <Menu.Button className='focus:outline-none' >
                        {!open
                            ? <Hamburger className='w-6 h-6 text-dark-1 dark:text-white' />
                            : <Close className='w-6 h-6 text-dark-1 dark:text-white' />
                        }
                    </Menu.Button>
                    <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items
                            
                            style={{ top: '3.25rem' }}
                            className={`
                                font-medium text-sm w-screen h-screen
                                box-border absolute -right-4
                                bg-white dark:bg-dark-1 text-lg z-30
                            `}
							>
                            <div className='w-full px-6 py-2 flex flex-col' >
								<Item>Explore</Item>
								<Item>Create</Item>
								<Item defaults={false} >
									{({ active }) => (
										<ThemeSwitch text={true}
												tw={`text-dark-2 dark:text-white px-4 py-2 w-full justify-start ${active && 'bg-hovers-white dark:bg-hovers-dark'}`}
											/>
									)}
								</Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </>
            )}
        </Menu>
    )
}

export default HamburgerMenu