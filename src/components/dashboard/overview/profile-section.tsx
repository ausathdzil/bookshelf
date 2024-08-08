import Overview from '@/components/dashboard/overview/overview';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { SelectBook } from '@/schema';

export default function ProfileSection({
  user,
  books,
}: {
  user: any;
  books: SelectBook[];
}) {
  return (
    <>
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
    </>
  );
}
