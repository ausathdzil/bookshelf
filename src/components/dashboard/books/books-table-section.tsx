import { auth } from '@/auth';
import { columns } from '@/components/dashboard/books/books-columns';
import BooksTable from '@/components/dashboard/books/books-table';
import { getBooksByUserId } from '@/lib/data';

export default async function BooksTableSection() {
  const session = await auth();
  const user = session?.user;
  const books = await getBooksByUserId(user?.id as string);
  const formattedBooks = books.map((book) => ({
    ...book,
    pagesProgress: `${book.pagesRead} / ${book.pages}` || null,
    updatedAt: book.updatedAt.toISOString().split('T')[0] || '',
  }));

  return (
    <>
      <h1 className="text-3xl font-bold">{user?.name}&apos;s Bookshelf</h1>
      <BooksTable
        columns={columns}
        data={formattedBooks}
      />
    </>
  );
}
