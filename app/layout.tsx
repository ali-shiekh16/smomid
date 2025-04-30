import type { Metadata } from 'next';
import './globals.css';
import Block from './components/Block';
import Navbar from './components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { AuthProvider } from './context/AuthContext';

export const metadata: Metadata = {
  title: 'SMOMID',
  description:
    'Smomid (String Modeling Midi Device) is a unique, custom-built electronic instrument created by musician Nick Demopoulos.',
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`relative bg-gradient-to-t min-h-screen from-primary to-secondary text-white flex flex-col antialiased overflow-x-hidden`}
      >
        <AuthProvider>
          <Link href='/'>
            <Image
              className='absolute top-5 left-5 z-30'
              src='/icons/logo.svg'
              alt='Smomid logo'
              width='70'
              height='70'
            />
          </Link>
          <main className='flex-1'>
            <Block>{children}</Block>
          </main>
          <Navbar />
        </AuthProvider>
      </body>
    </html>
  );
}
