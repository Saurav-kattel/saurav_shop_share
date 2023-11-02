
import Providers from '@/app/components/utils/Provider';
import './globals.css';
import type { Metadata } from 'next';;
import NavBar from './components/navbar/NavBar';
import React from 'react';
import { ClientCookiesProvider } from './components/utils/CookieClinetProvider';
import { cookies } from 'next/headers';


export const metadata: Metadata = {
  title: 'Saurav shop',
  description: 'Best e-commerce site into existance',
};

function App({ children }: { children: React.ReactNode; }) {
  "use client";
  return <>
    <ClientCookiesProvider value={cookies().getAll()}>
      <NavBar />
      {children}
    </ClientCookiesProvider>

  </>;
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <App  >
            {children}
          </App>
        </Providers>
      </body>
    </html>
  );
}
