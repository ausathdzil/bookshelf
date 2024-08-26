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
    <header>
      <nav className="flex justify-between items-center py-4 px-72">
        <Link href="/">
          <Button
            className="space-x-2"
            variant="link"
          >
            <LibraryBigIcon />
            <span>Bookshelf</span>
          </Button>
        </Link>
        <ul className="flex items-center gap-4">
          {session ? (
            <>
              <li>
                <Link href="/dashboard">
                  <Button variant='ghost'>Dashboard</Button>
                </Link>
              </li>
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
                    <span>{user?.name}</span>
                    <span className="text-sm font-light">{user?.email}</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <SignOut />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <li>
              <Link href="/signin">
                <Button variant="outline">Sign In</Button>
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <Separator />
    </header>
  );
}
