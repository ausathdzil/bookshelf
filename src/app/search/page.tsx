import OpenLibraryBook from '@/components/search/open-library-book';
import SearchBook from '@/components/search/search-book';
import { Suspense } from 'react';

export default function Page({
  searchParams,
}: {
  searchParams?: { query: string };
}) {
  const query = searchParams?.query || '';

  return (
    <section className="w-full flex flex-col items-center gap-8">
      <SearchBook />
      <Suspense fallback={<p>Loading...</p>}>
        <OpenLibraryBook query={query} />
      </Suspense>
    </section>
  );
}
