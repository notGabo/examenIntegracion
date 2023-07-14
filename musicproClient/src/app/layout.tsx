import './globals.css'
import { Inter } from 'next/font/google'
import Provider from './components/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MusicPro',
  description: 'Trabajo para integracion de plataformas DuocUC Sede Maipu 2023 - Profesor evaluador Francisco Valdivieso',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="es">
      <body className={`${inter.className} bg-neutral-700`} suppressHydrationWarning={true}>
        <Provider>
        {children}
        </Provider>
        </body>
    </html>
  )
}
