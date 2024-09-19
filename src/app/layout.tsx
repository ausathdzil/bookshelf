import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import { getUser } from '@/lib/data';
import { UserProvider } from '@/lib/user-provider';

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
  const userPromise = getUser();

  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/favicon.ico"
          sizes="any"
        />
      </head>
      <body className={`${manrope.className} antialiased bg-zinc-50 `}>
        <UserProvider userPromise={userPromise}>
          <Header />
          <main className="flex flex-col items-center py-10 gap-8 min-h-[calc(100vh-160px)] max-w-[80%] sm:max-w-[95%] mx-auto">
            {children}
          </main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
