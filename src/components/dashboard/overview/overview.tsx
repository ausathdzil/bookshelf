import BookChart from '@/components/dashboard/overview/book-chart';
import RecentBookCard from '@/components/dashboard/overview/recent-book-card';
import { SelectBook } from '@/db/schema';

export default async function Overview({ books }: { books: SelectBook[] }) {
  if (books.length === 0) {
    return <p>No books found.</p>;
  }

  return (
    <div className="w-full grid xl:grid-cols-2 gap-6">
      <ul className="space-y-6 hidden xl:block">
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
