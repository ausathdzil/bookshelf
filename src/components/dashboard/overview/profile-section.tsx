import Overview from '@/components/dashboard/overview/overview';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { SelectBook } from '@/db/schema';
import { User } from 'next-auth';
import Link from 'next/link';

export default function ProfileSection({
  user,
  books,
}: {
  user: User | undefined;
  books: SelectBook[];
}) {
  return (
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
        {books.length > 0 && (
          <>
            <h2 className="font-bold">Recent Books</h2>
            <ul className="text-sm space-y-2 list-disc">
              {books.slice(0, 7).map((book) => (
                <li key={book.id}>
                  <Link
                    className="hover:underline"
                    href={`/${user?.id}/dashboard/books/${book.id}`}
                  >
                    {book.title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <Overview userId={user?.id as string} />
    </div>
  );
}
