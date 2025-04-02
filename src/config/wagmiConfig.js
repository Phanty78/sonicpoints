import { createConfig, http } from 'wagmi';
import { sonic } from 'wagmi/chains';

export const config = createConfig({
  chains: [sonic],
  transports: {
    [sonic.id]: http(),
  },
});
