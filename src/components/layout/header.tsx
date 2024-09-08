import { auth } from '@/auth';
import SignOut from '@/components/auth/signout-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { LibraryBigIcon } from 'lucide-react';
import Link from 'next/link';

export default async function Header() {
  const session = await auth();
  const user = session?.user;

  return (
    <>
      <header className="max-w-[75%] mx-auto">
        <nav className="flex justify-between items-center py-4">
          <Link href="/">
            <Button
              className="space-x-2"
              variant="link"
            >
              <LibraryBigIcon />
              <span className="hidden sm:block">Bookshelf</span>
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/search">
              <Button variant="link">Search Books</Button>
            </Link>
            {session ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="overflow-hidden rounded-full"
                    >
                      <Avatar>
                        <AvatarImage src={user?.image as string} />
                        <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel className="flex flex-col">
                      <p>{user?.name}</p>
                      <p className="text-sm font-light">{user?.email}</p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link
                        className="w-full"
                        href="/dashboard"
                      >
                        <Button className="w-full">Dashboard</Button>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <SignOut />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link href="/signin">
                <Button variant="outline">Sign In</Button>
              </Link>
            )}
          </div>
        </nav>
      </header>
      <Separator />
    </>
  );
}
