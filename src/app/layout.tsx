
import { Providers as Provider } from '@/app/components/utils/Provider';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from './components/navbar/NavBar';
import store from '@/redux/app/store';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Saurav shop',
  description: 'Best e-commerce site into existance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
