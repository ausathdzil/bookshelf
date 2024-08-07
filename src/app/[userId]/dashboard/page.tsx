import { getBooksByUserId } from '@/queries/select';

export default async function Page({ params }: { params: { userId: string } }) {
  const books = await getBooksByUserId(params.userId);

  return (
    <>
      {books.length === 0 ? (
        <p>No books found</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <p>{book.title}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
