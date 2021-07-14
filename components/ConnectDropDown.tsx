import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react"
import Button from './Button'
import { useWallet } from '../utils/wallet'
import { displayPublicKey } from '../utils'

const Item = ({ children, tw, activeTw, onClick = () => null }) => {
	return (
		<Menu.Item>
            {({ active }) => (
                <button onClick={onClick} className={`focus:outline-none ${tw} px-4 py-2 rounded w-full text-left ${active && activeTw}`} >
                    {children}
                </button>
            )}
        </Menu.Item>
	)
}

const ConnectDropDown = () => {
    const { publicKey, balance, disconnect } = useWallet()
    const [key, setKey] = useState(publicKey?.substr(0, 10) + '...')

    const handleCopy = async () => {
        await navigator.clipboard.writeText(publicKey)
        setKey('Copied!')
        setTimeout(() => {
            setKey(publicKey?.substr(0, 10) + '...')
        }, 1000)
    }

	return (
		<Menu as="div" className="relative z-50 inline-block text-left">
            {({ open }) => (
                <>
                    <Menu.Button className={`
                        rounded shadow-4_4 font-semibold focus:outline-none
                        transition duration-250 grid place-content-center w-32 h-10 
                        text-sm text-dark-2 bg-extra-1 hover:bg-hovers-extra
                    `}>
                        {displayPublicKey(publicKey)}
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
                            static
                            style={{ borderColor: 'rgba(234, 234, 234, 0.5)' }}
                            className={`
                                w-48 divide-y font-medium text-sm shadow-4_2
                                box-border absolute right-0 top-16 origin-top-right 
                                rounded bg-white dark:bg-dark-2 
                            `} >
                            <div className='px-2 p-4' >
								<Item 
                                    tw='text-dark-2 dark:text-white' activeTw='bg-hovers-white dark:bg-hovers-dark'
                                    onClick={handleCopy}
                                >
                                    {key}
                                </Item>
								<Item tw='text-dark-2 dark:text-white' activeTw='bg-hovers-white dark:bg-hovers-dark' >
                                    { balance?.toFixed(2) } SOL
                                </Item>
                            </div>
                            <div className='px-2 pb-4 pt-2' >
								<Item tw='text-pink' activeTw='' onClick={disconnect} >Disconnect</Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </>
            )}
        </Menu>
	)
}

export default ConnectDropDown