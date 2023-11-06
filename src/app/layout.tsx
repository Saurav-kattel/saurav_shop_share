
import './globals.css';
import type { Metadata } from 'next';;
import React from 'react';
import { cookies } from 'next/headers';
import { ClientCookiesProvider } from './(frontend)/components/utils/CookieClinetProvider';
import NavBar from './(frontend)/components/navbar/NavBar';
import Providers from './(frontend)/components/utils/Provider';


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
