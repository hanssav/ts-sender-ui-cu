import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'TSender',
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <Providers>{props.children}</Providers>
      </body>
    </html>
  );
}
