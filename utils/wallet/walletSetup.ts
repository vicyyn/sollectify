import type { PublicKey } from "@solana/web3.js"
import { Transaction } from "@solana/web3.js"
import EventEmitter  from 'eventemitter3'
import { useEffect } from 'react'

export interface WalletAdapter extends EventEmitter {
    publicKey: PublicKey | null
    signTransaction: (transaction: Transaction) => Promise<Transaction>
    connect: () => any
    disconnect: () => any
}

export type walletContextType = {
    wallet: WalletAdapter | undefined,
    isConnected: boolean,
    provider: any,
    setProviderUrl: any,
    endpoint: string,
  }

export const defaultContext = () => {
  return {
    wallet: undefined,
    isConnected: false,
    provider: null,
    setProviderUrl: undefined,
    endpoint: '',
  }
}

type initWalletType = (
  wallet: WalletAdapter, onConnect: () => void, onDisconnect: () => void
) => void
export const useInitWallet: initWalletType = (wallet, onConnect, onDisconnect) => {
  useEffect(() => {
    if (!wallet) return
    wallet.on('connect', onConnect)
    wallet.on('disconnect', onDisconnect)
    return () => {
      onDisconnect()
      if (wallet) wallet.disconnect()
    }
  }, [wallet])
}