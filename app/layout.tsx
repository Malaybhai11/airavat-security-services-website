import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://airavatsecurity.in';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'AIRAVAT Security Service - Professional Security Solutions in Gujarat',
    template: '%s | AIRAVAT Security Service',
  },
  description: 'Premier security solutions provider offering 24/7 protection across Gujarat with trained ex-servicemen professionals. Professional security guards, CCTV operators, and advanced security equipment.',
  keywords: ['security services', 'security guards', 'Gujarat security', 'professional security', 'CCTV operators', 'security equipment', 'Jamnagar security', 'Rajkot security'],
  authors: [{ name: 'AIRAVAT Security Service' }],
  creator: 'AIRAVAT Security Service',
  publisher: 'AIRAVAT Security Service',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: baseUrl,
    siteName: 'AIRAVAT Security Service',
    title: 'AIRAVAT Security Service - Professional Security Solutions in Gujarat',
    description: 'Premier security solutions provider offering 24/7 protection across Gujarat with trained ex-servicemen professionals.',
    images: [
      {
        url: `${baseUrl}/logo2.jpg`,
        width: 1200,
        height: 630,
        alt: 'AIRAVAT Security Service',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIRAVAT Security Service - Professional Security Solutions',
    description: 'Premier security solutions provider offering 24/7 protection across Gujarat.',
    images: [`${baseUrl}/logo.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="theme-color" content="#040936" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
