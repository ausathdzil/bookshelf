import { auth } from '@/auth';
import Overview from '@/components/dashboard/overview';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getBooksByUserId } from '@/queries/select';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user;
  const books = user ? await getBooksByUserId(user.id as string) : [];

  return (
    <>
      <section className="w-full flex flex-col justify-center items-start gap-6 px-44">
        <h1 className="text-3xl font-bold">Profile</h1>
        <div className="w-full flex items-start gap-16">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user?.image as string} />
              <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h2 className="text-lg font-bold">{user?.name}</h2>
              <p>{user?.email}</p>
            </div>
            {books.length > 0 && (
              <>
                <p>Recently Added</p>
                {books
                  .slice(0, 5)
                  .reverse()
                  .map((book) => (
                    <ul key={book.id}>
                      <li>{book.title}</li>
                    </ul>
                  ))}
              </>
            )}
          </div>
          <Overview userId={user?.id as string} />
        </div>
        <h1 className="text-3xl font-bold">Books</h1>
        <div className="flex flex-col items-center gap-4">{children}</div>
      </section>
    </>
  );
}
