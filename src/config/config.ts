// contract addresses

import { HyperclusterABI, HyperclusterFactoryABI } from "@/helpers/abi";

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
  endpoint: (process.env.NEXT_PUBLIC_VERCEL_ENV) ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'http://localhost:3000'
}

console.log("this endpoint", settings.endpoint);


// ?ref=401c35625d67701f9b572fe8c8313d71b3618170a7f1b6c76de0b13d3e671979e7e687e142d057e258a5cc8a71293d21c6b9b2ca5ea52fff0b221c6933693805c5f1cd9bc457b9b3db59f8773c9a6ef1202193fc372b31aa32666eda3ea50aec