import Header from '@/components/layout/header';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bookshelf',
  description: 'A simple bookshelf app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/favicon.ico"
          sizes="any"
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className="flex flex-col items-center py-10 gap-10">
          {children}
        </main>
      </body>
    </html>
  );
}
