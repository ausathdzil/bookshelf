'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteBook } from '@/queries/delete';
import { ColumnDef } from '@tanstack/react-table';
import { EyeIcon, MoreHorizontal, PencilIcon, Trash2Icon } from 'lucide-react';
import Link from 'next/link';

export type BookColumn = {
  id: string;
  title: string;
  author: string | null;
  genre: string | null;
  pagesProgress: string | null;
  volumesProgress: string | null;
  status: string | null;
  updatedAt: string | null;
  userId: string;
};

export const columns: ColumnDef<BookColumn>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'author',
    header: 'Author',
  },
  {
    accessorKey: 'genre',
    header: 'Genre',
  },
  {
    accessorKey: 'pagesProgress',
    header: 'Pages',
  },
  {
    accessorKey: 'volumesProgress',
    header: 'Volumes',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'updatedAt',
    header: 'Last Updated',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const book = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link
                href={`/${book.userId}/dashboard/books/${book.id}`}
                className="w-full flex justify-between gap-4"
              >
                <span>View details</span>
                <EyeIcon size={20} />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href={`/${book.userId}/dashboard/books/${book.id}/edit`}
                className="w-full flex justify-between gap-4"
              >
                <span>Edit book</span>
                <PencilIcon size={20} />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <form
                className="w-full"
                action={async () => {
                  try {
                    await deleteBook(book.id, book.userId);
                  } catch (error) {
                    console.error(error);
                  }
                }}
              >
                <button
                  className="w-full flex justify-between gap-4"
                  type="submit"
                >
                  <span>Delete</span>
                  <Trash2Icon size={20} />
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
