import { auth } from '@/auth';
import BookCard from '@/components/dashboard/overview/book-card';
import { getBooksByUserId } from '@/lib/data';

export default async function BooksSection() {
  const session = await auth();
  const user = session?.user;
  const books = await getBooksByUserId(user?.id as string);

  return (
    <ul className="w-full grid grid-cols-4 gap-6">
      {books.length > 0 && (
        <>
          {books.slice(0, 9).map((book) => (
            <li key={book.id}>
              <BookCard book={book} />
            </li>
          ))}
        </>
      )}
    </ul>
  );
}
