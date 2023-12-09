// contract addresses

import { HyperclusterABI, HyperclusterFactoryABI } from "@/helpers/abi";

// etc. 
const prod = process.env.NEXT_PUBLIC_VERCEL_ENV == "production";

console.log("is prod environment?", prod);

console.log(process.env.NEXT_PUBLIC_VERCEL_URL)


export const settings = {
  fuji: {
    SafeImplementation: {
      address: '0x363682C8b357A7f2bD7a0d6814E09DC25bBADE13',
      explorerURL: 'https://testnet.snowtrace.io/address/0x363682C8b357A7f2bD7a0d6814E09DC25bBADE13',
    },
    HyperclusterImplementation: {
      address: '0x160423CF968558D35D9296eAee27b622d69400C6',
      explorerURL: 'https://testnet.snowtrace.io/address/0x160423CF968558D35D9296eAee27b622d69400C6',
      abi: HyperclusterABI
    },
    HyperclusterFactory: {
      address: '0x1aDCe044231b77e806fb2986A49F5342675429Ac',
      explorerURL: 'https://testnet.snowtrace.io/address/0x50e2c7614bEd6E64b2128d70f23281B6Cf712cDC',
      abi: HyperclusterFactoryABI

    }
  },
  endpoint: prod ? `http://${process.env.NEXT_PUBLIC_VERCEL_ENV}` : 'http://localhost:3000'
}

console.log("this endpoint", settings.endpoint);