'use client';

import { useAccount as useWagmiAccount } from 'wagmi';

export function useAccount() {
  const { address, isConnected, isConnecting } = useWagmiAccount();

  return {
    address,
    isConnected,
    isConnecting,
  };
}
