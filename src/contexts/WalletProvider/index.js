import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, createConfig } from 'wagmi'
import { bsc, bscTestnet } from 'wagmi/chains'
import { WagmiProvider } from 'wagmi'
import { injected } from 'wagmi/connectors'

// 添加 OKX X Layer (id: 196)
const xLayer = {
  id: 196,
  name: 'OKX X Layer',
  network: 'okx-xlayer',
  nativeCurrency: {
    name: 'OKB',
    symbol: 'OKB',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.xlayer.tech'],
    },
    public: {
      http: ['https://rpc.xlayer.tech'],
    },
  },
  blockExplorers: {
    default: { name: 'OKX Explorer', url: 'https://www.oklink.com/xlayer' },
  },
}

const queryClient = new QueryClient()

bsc.rpcUrls.default.http = ['https://bsc-dataseed1.bnbchain.org', 'https://bsc-dataseed2.defibit.io']

export const config = createConfig({
  chains: [bsc, xLayer], // 添加 xLayer
  connectors: [
    injected()
  ],
  transports: {
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
    [xLayer.id]: http(),
  },
})

function WalletProvider({children}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default WalletProvider