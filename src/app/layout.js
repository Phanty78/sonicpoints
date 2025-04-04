import { Web3Providers } from '@/components/providers/Web3Providers';
import '@/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import Header from '@/components/layout/header/Header';
import Footer from '@/components/layout/footer/Footer';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import MainWrapper from '@/components/layout/wrapper/MainWrapper';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'SonicPoints',
  description: 'All your airdrop points in one place',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className="mx-2 flex flex-col items-center justify-center gap-4 lg:mx-4"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Web3Providers>
            <MainWrapper>
              <Header />
              {children}
              <Footer />
              <Analytics />
            </MainWrapper>
          </Web3Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
