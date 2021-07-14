import { createContext, useCallback, useContext, useEffect, useMemo, useState, } from "react"
import { providers } from './providers' // WALLET_PROVIDERS
import { getPublicKey, displayPublicKey, useBalance } from '..'
import { defaultContext, useInitWallet, WalletAdapter } from './walletSetup'
import type { walletContextType } from './walletSetup'
import { useNotification } from "../context"


const WalletContext = createContext<walletContextType>(defaultContext())

const useWallet = () => {
  const { wallet, isConnected, setProviderUrl, endpoint } = useContext(WalletContext)
  const connect = async (url: string) => {
    setProviderUrl(url)
    wallet?.connect()
  }
  const disconnect = () => wallet?.disconnect()
  const { balance } = useBalance(endpoint, wallet)
  return {
    wallet, isConnected, publicKey: getPublicKey(wallet), connect, disconnect, balance
  }
}

const WalletProvider = ({ children }) => {
  const endpoint = 'https://solana-api.projectserum.com/' // default endpoint
  const [providerUrl, _setProviderUrl] = useState('') // providerUrl State
  const setProviderUrl = useCallback(url => _setProviderUrl(url), [])
  const provider = useMemo( 
    () => providers.find(({ url }) => url === providerUrl),
    [providerUrl]
  ) // change the provider whenever the providerUrl changes
  const wallet = useMemo(
    () => provider ? new provider.adapter(providerUrl, endpoint) as WalletAdapter : null,
    [provider, providerUrl, endpoint]
  ) // change the wallet whenever provider, providerUrl, endpoint change
  const [isConnected, setConnected] = useState<boolean>(false) // isConnected State
  const { setNotify } = useNotification()
  useEffect(() => {
    console.log('connecting..')
    wallet?.connect()
  }, [wallet])

  useInitWallet(wallet, 
    () => { // on Connect
      setConnected(true)
      setNotify('Connected to ' + displayPublicKey(getPublicKey(wallet)))
    },
    () => { // on Disconnect
      setConnected(false)
      setNotify('Disconnected')
  }) // what happens when connect/disconnect event happens

  return (
    <WalletContext.Provider value={{
      wallet, isConnected, provider, setProviderUrl: url => setProviderUrl(url), endpoint
    }} >
      {children}
    </WalletContext.Provider>
  )
}

export {
  useWallet,
  WalletProvider,
}