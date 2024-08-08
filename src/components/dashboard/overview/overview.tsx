import BookChart from '@/components/dashboard/overview/book-chart';
import RecentBookCard from '@/components/dashboard/overview/recent-book-card';
import { getBooksByUserId } from '@/queries/select';

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
            <RecentBookCard book={book} />
          </li>
        ))}
      </ul>
      <BookChart books={books} />
    </div>
  );
}
