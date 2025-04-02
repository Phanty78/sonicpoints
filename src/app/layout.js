import { Web3Providers } from '@/components/providers/Web3Providers';
import '@/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

export const metadata = {
  title: 'SonicPoints',
  description: 'All your airdrop points in one place',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Web3Providers>{children}</Web3Providers>
      </body>
    </html>
  );
}
