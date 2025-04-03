'use client';

import { config } from '@/config/wagmiConfig';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

const queryClient = new QueryClient();

export function Web3Providers({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize='wide'
          coolMode
          locale='en-US'
          theme={darkTheme({
            accentColor: '#000000',
            accentColorForeground: 'white',
            fontStack: 'system',
            fontTheme: 'dark',
            fontWeight: '500',
            fontSize: '16px',
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
