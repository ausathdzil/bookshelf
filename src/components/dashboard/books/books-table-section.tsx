import { columns } from '@/components/dashboard/books/books-columns';
import BooksTable from '@/components/dashboard/books/books-table';
import { getBooksByUserId, getUser } from '@/lib/data';

export default async function BooksTableSection() {
  const user = await getUser();
  const books = await getBooksByUserId(user?.id as string);
  const formattedBooks = books.map((book) => ({
    ...book,
    title:
      book.title.length > 30 ? `${book.title.substring(0, 30)}...` : book.title,
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
