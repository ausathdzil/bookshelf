import AddBookButton from '@/components/search/add-book-button';
import { fetchBookByISBN } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';

export default async function OpenLibraryBook({ query }: { query: string }) {
  const book = await fetchBookByISBN(query);

  return (
    <>
      {book && (
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative w-[225px] h-[350px]">
            {book.cover ? (
              <Image
                src={book.cover.large}
                alt={book.title}
                className="rounded-tr-sm rounded-br-sm"
                fill
              />
            ) : (
              <div className="p-4 text-center w-full h-full rounded-md bg-muted flex flex-col justify-center items-center gap-2">
                <h1 className="text-xl font-bold">{book.title}</h1>
                <p className="text-base text-muted-foreground">
                  {book.authors &&
                    book.authors.map((author) => author.name).join(', ')}
                </p>
              </div>
            )}
          </div>
          <div className="space-y-4 text-center sm:text-left">
            <article className="space-y-1 w-[300px]">
              <h1 className="text-lg font-bold">{book.title}</h1>
              {book.authors && (
                <p className="text-base text-muted-foreground">
                  {book.authors.map((author) => author.name).join(', ')}
                </p>
              )}
              {book.subjects && (
                <p>
                  {book.subjects
                    .slice(0, 4)
                    .map((subject) => subject.name)
                    .join(', ')}
                </p>
              )}
              {book.number_of_pages && <p>{book.number_of_pages} pages</p>}
              {book.url && (
                <Link
                  href={book.url}
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  More Info
                </Link>
              )}
            </article>
            <AddBookButton book={book} />
          </div>
        </div>
      )}
    </>
  );
}
