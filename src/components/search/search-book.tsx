'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBook() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="lg:w-1/6 flex flex-col items-center gap-2">
      <Label
        htmlFor="search"
        className="text-xl sr-only"
      >
        Search Book
      </Label>
      <Input
        type="text"
        id="search"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
        placeholder="Enter ISBN"
      />
      <p className="text-sm text-muted-foreground text-center">
        ISBN API provided by{' '}
        <span>
          <Link
            href="https://openlibrary.org/dev/docs/api/books"
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            Open Library
          </Link>
        </span>
      </p>
    </div>
  );
}
