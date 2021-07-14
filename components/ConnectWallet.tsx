import DropDown from './ConnectDropDown'
import Modal from './ConnectModal'
import { useWallet } from '../utils/wallet'

const ConnectWallet = () => {
	const { isConnected } = useWallet()
    return (
		<>
			{ isConnected ? <DropDown /> : <Modal /> }
		</>
    )
}

export default ConnectWallet