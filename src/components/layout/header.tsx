import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { LibraryBigIcon } from 'lucide-react';
import Link from 'next/link';
import HeaderDropdown from './header-dropdown';

export default function Header() {
  return (
    <>
      <header className="max-w-[75%] mx-auto">
        <nav className="flex justify-between items-center py-4">
          <Link href="/">
            <Button
              className="space-x-2"
              variant="link"
            >
              <LibraryBigIcon />
              <span className="hidden sm:block">Bookshelf</span>
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/search">
              <Button variant="link">Search Books</Button>
            </Link>
            <HeaderDropdown />
          </div>
        </nav>
      </header>
      <Separator />
    </>
  );
}
