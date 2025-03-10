import type { Metadata } from 'next';
import './globals.css';
import Block from './components/Block';
import Navbar from './components/Navbar';

export const metadata: Metadata = {
  title: 'SMMOID',
  description:
    'Smomid (String Modeling Midi Device) is a unique, custom-built electronic instrument created by musician Nick Demopoulos.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`bg-gradient-to-t min-h-screen from-primary to-secondary text-white flex flex-col antialiased`}
      >
        <main className='flex-1'>
          <Block>{children}</Block>
        </main>
        <Navbar />
      </body>
    </html>
  );
}
