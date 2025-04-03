import { Web3Providers } from '@/components/providers/Web3Providers';
import '@/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import Header from '@/components/layout/header/Header';
import Footer from '@/components/layout/footer/Footer';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
export const metadata = {
  title: 'SonicPoints',
  description: 'All your airdrop points in one place',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Web3Providers>
        <body className="mx-2 flex flex-col items-center justify-center gap-4 lg:mx-4">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </body>
      </Web3Providers>
    </html>
  );
}
