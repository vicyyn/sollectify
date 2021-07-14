// import wallet adapters: LedgerWalletAdapter, SolongWalletAdapter, PhantomWalletAdapter
import Wallet from "@project-serum/sol-wallet-adapter"
import { PhantomWalletAdapter, SolongWalletAdapter, LedgerWalletAdapter } from './adapters'

type Provider = {
  name: string,
  url: string,
  icon: string,
  adapter: any
}

export const providers: Provider[] = [
    {
      name: "Sollet",
      url: "https://www.sollet.io",
      icon: '/wallets/sollet.png',
      adapter: Wallet
    },
    {
      name: "Solong",
      url: "https://www.solongwallet.com",
      icon: '/wallets/solong.png',
      adapter: SolongWalletAdapter
    },
    {
      name: "Phantom",
      url: "https://www.phantom.app",
      icon: '/wallets/phantom.png',
      adapter: PhantomWalletAdapter
    },
    {
      name: "Ledger",
      url: "https://www.ledger.com",
      icon: '/wallets/ledger.png',
      adapter: LedgerWalletAdapter
    }
  ]

/*
others: 
{
      name: "Solong",
      url: "/wallets/solong.png",
      adapter: SolongWalletAdapter,
    },
    {
      name: "Solflare",
      icon: `${ASSETS_URL}solflare.svg`,
    },
    {
      name: "MathWallet",
      url: "https://mathwallet.org",
    },
    {
      name: "Ledger",
      url: "https://www.ledger.com",
      adapter: LedgerWalletAdapter,
    },
    {
      name: "Phantom",
      url: "/wallets/phantom.png",
      adapter: PhantomWalletAdapter,
    },
*/