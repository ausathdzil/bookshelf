'use client';

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
import { useUser } from '@/lib/user-provider';
import Link from 'next/link';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

export default function HeaderDropdown() {
  const user = useUser();

  if (!user) {
    return (
      <Link href="/signin">
        <Button variant="outline">Sign In</Button>
      </Link>
    );
  }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Avatar>
              <AvatarImage src={user.image ?? ''} />
              <AvatarFallback>{user.name?.[0] ?? 'U'}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="flex flex-col">
            <p>{user.name?.split(' ')[0]}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="hover:cursor-pointer">
            <Link href="/dashboard">Dashboard</Link>
          </DropdownMenuItem>
          <DialogTrigger
            className="text-red-500 hover:cursor-pointer"
            asChild
          >
            <DropdownMenuItem>Sign Out</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <SignOut />
    </Dialog>
  );
}
