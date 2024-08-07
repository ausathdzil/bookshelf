import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({ subsets: ['latin'] });

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
      <body className={`${manrope.className} antialiased`}>
        <Header />
        <main className="flex flex-col bg-zinc-50 items-center py-10 gap-10 min-h-[calc(100vh-160px)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
