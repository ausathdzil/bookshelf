import { auth } from '@/auth';
import BookCard from '@/components/dashboard/books/book-card';
import Overview from '@/components/dashboard/overview/overview';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { getBooksByUserId } from '@/queries/select';

export default async function Page() {
  const session = await auth();
  const user = session?.user;
  const books = user ? await getBooksByUserId(user.id as string) : [];

  return (
    <>
      <section className="w-full flex flex-col justify-center items-start gap-6 px-44">
        <h1 className="text-3xl font-bold">Profile</h1>
        <Separator />
        <div className="w-full flex items-start gap-16">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user?.image as string} />
              <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div className="text-center space-y-2">
              <p className="font-bold">{user?.name}</p>
              <p>{user?.email}</p>
            </div>
            <h2 className="font-bold">Recent Books</h2>
            <ul className="text-sm space-y-2 list-disc">
              {books.length > 0 && (
                <>
                  {books.slice(0, 6).map((book) => (
                    <li key={book.id}>{book.title}</li>
                  ))}
                </>
              )}
            </ul>
          </div>
          <Overview userId={user?.id as string} />
        </div>
        <Separator />
      </section>
      <section className="w-full flex flex-col justify-center items-center gap-6 px-44">
        <h1 className="text-3xl font-bold">Books</h1>
        <Separator />
        {books.length > 0 && (
          <>
            <ul className="w-full grid grid-cols-5">
              {books.slice(0, 5).map((book) => (
                <li key={book.id}>
                  <BookCard book={book} />
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </>
  );
}
