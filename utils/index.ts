import { useEffect, useState } from 'react'
import { Connection } from '@solana/web3.js'
import { Wallet } from '../components/Vectors'

const displayPublicKey = (publicKey) => {
    if (!publicKey) return null
    const len = publicKey.length
    const _ = (str: string, s, e?) => str.substring(s, e)
    return publicKey.length > 20 ? `${_(publicKey, 0, 4)}...${_(publicKey, len - 4, len)}` : publicKey
}

const getPublicKey = wallet => wallet?.publicKey?.toBase58()

const useBalance = (network, wallet) => {
    const [balance, _set] = useState(null)
    useEffect(() => {
        if (wallet?.publicKey) 
            new Connection(network).getBalance(wallet.publicKey)
                .then(balance => {
                    console.log('Got the balance')
                    _set(balance * 0.000000001)
                })
        else _set(null)
    }, [wallet])
    return {
        balance
    }
}


/*
const useLocalStorage = key => {
    const get = key => {
        const data = localStorage.getItem(key)
        return key ? null : JSON.parse(data)
    }
    const [state, _setState] = useState(get(key))
    const _set =  data => {
        _setState(data)
        if (!data) localStorage.removeItem(key)
        localStorage.setItem(key, JSON.stringify(data))
    }
    const setState = useCallback(_set, [state, key])

    return [
        state,
        setState
    ]
}
*/
export {
    displayPublicKey,
    getPublicKey,
    useBalance
}