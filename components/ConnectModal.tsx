import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { providers } from '../utils/wallet/providers'
import { useWallet } from '../utils/wallet'
import { useTheme } from '../utils/context'

const Button = ({ children, onClick }) => (
    <button className={`
        text-dark-2 bg-extra-1 hover:bg-hovers-extra text-sm
        rounded shadow-4_4 font-semibold
        transition duration-250 grid place-content-center w-32 h-10 focus:outline-none
    `} onClick={onClick} >
        {children}
    </button>
)

const X = ({ color }: { color: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`fill-current ${color}`} width="16" height="16" viewBox="0 0 24 24">
    <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
  </svg>
)

export default function Modal() {
  const { theme } = useTheme()
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)

  const { connect } = useWallet()

  return (
    <>
    <Button onClick={openModal} >Connect Wallet</Button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={closeModal} className={`fixed inset-0 z-10 overflow-y-auto ${theme}`} >
          <div className="h-screen px-4 flex justify-center items-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
            </Transition.Child>
            <span className="inline-block h-screen align-middle" aria-hidden="true" >&#8203;</span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            > 
              <div className="font-quicksand max-w-md rounded w-96 h-96 dark:bg-dark-2 bg-white shadow-xl inline-block overflow-hidden align-middle transition-all transform">
                <Dialog.Title
                  as="h3"
                  className="font-semibold leading-6 dark:text-white text-dark-2 p-6 border-b border-opacity-20 flex justify-between items-center"
                >
                  <>Connect your Wallet</>
                  <button 
                    className='focus:outline-none' 
                    onClick={closeModal} >
                      <X color='dark:text-white text-dark-2' />
                    </button>
                </Dialog.Title>

                  <div className="m-6 flex flex-col gap-y-4">
                    {
                      providers.map(({ name, icon, url }) => (
                        <button key={name} type="button"
                        /* */
                          className="box-border w-full inline-flex dark:text-white dark:hover:bg-dark-hovered text-dark-2 hover:bg-light-hovered justify-center p-3 text-sm border dark:border-white border-dark-2 border-opacity-30 rounded-lg focus:outline-none"
                          onClick={() => connect(url)}
                        >
                          <div className='font-semibold flex items-center w-full gap-x-2' >
                            <img src={icon} alt={name} width='24' height='24' />
                            {name}
                          </div>
                        </button>
                      ))
                    }
                  </div>
                
                
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

/*


background: #232323;



border: 1px solid rgba(255, 255, 255, 0.3);

X 
position: absolute;
width: 16px;
height: 16px;
left: 360px;
top: 24px;

*/