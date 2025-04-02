import './globals.css'

export const metadata = {
  title: 'SonicPoints',
  description: 'All your airdrop points in one place',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
