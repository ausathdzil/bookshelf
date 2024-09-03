import BookCard from '@/components/dashboard/overview/book-card';
import { SelectBook } from '@/db/schema';

export default function BooksSection({ books }: { books: SelectBook[] }) {
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
