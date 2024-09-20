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
import { Home, LogOut } from 'lucide-react';

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
            <Link
              href="/dashboard"
              className="flex items-center"
            >
              <Home size={16} />
              <span className="ml-2">Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DialogTrigger
            className="hover:cursor-pointer"
            asChild
          >
            <DropdownMenuItem className="flex items-center">
              <LogOut size={16} />
              <span className="ml-2">Sign Out</span>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <SignOut />
    </Dialog>
  );
}
