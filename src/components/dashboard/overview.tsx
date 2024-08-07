import { getBooksByUserId } from '@/queries/select';
import BookCard from '@/components/dashboard/book-card';
import BookChart from '@/components/dashboard/book-chart';

export default async function Overview({ userId }: { userId: string }) {
  const books = await getBooksByUserId(userId);

  if (books.length === 0) {
    return <p>No books found.</p>;
  }

  return (
    <div className="w-full flex gap-6">
      <ul className="w-1/2 space-y-6">
        {books.slice(0, 2).map((book) => (
          <li key={book.id}>
            <BookCard book={book} />
          </li>
        ))}
      </ul>
      <BookChart books={books} />
    </div>
  );
}
