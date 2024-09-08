'use client';

import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createBook } from '@/lib/actions';
import { OpenLibraryBook } from '@/lib/data';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const CreateBookFormSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: 'Title is required',
    })
    .max(200, { message: 'Title should not exceed 200 characters' }),
  author: z.string().min(1, {
    message: 'Author is required',
  }),
  genre: z.string().min(1, {
    message: 'Genre is required',
  }),
  pages: z.coerce.number().int().gt(0, {
    message: 'Pages should at least be 1',
  }),
});

export default function CreateBookForm({
  userId,
  OpenLibraryBook,
}: {
  userId: string;
  OpenLibraryBook?: OpenLibraryBook;
}) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateBookFormSchema>>({
    resolver: zodResolver(CreateBookFormSchema),
    defaultValues: {
      title: OpenLibraryBook?.title || '',
      author:
        OpenLibraryBook?.authors.map((author) => author.name).join(', ') || '',
      genre:
        OpenLibraryBook?.subjects
          .slice(0, 3)
          .map((subject) => subject.name)
          .join(', ') || '',
      pages: OpenLibraryBook?.number_of_pages || 0,
    },
  });

  async function onSubmit(values: z.infer<typeof CreateBookFormSchema>) {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('author', values.author);
    formData.append('genre', values.genre);
    formData.append('pages', values.pages.toString());

    const createBookWithId = createBook.bind(null, userId);

    startTransition(async () => {
      await createBookWithId(formData);
      form.reset();
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Book title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input
                  placeholder="Book author"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <FormControl>
                <Input
                  placeholder="Book genre"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pages</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Book pages"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button
            disabled={isPending}
            type="submit"
          >
            {isPending ? (
              <>
                <Loader2
                  size={16}
                  className="animate-spin"
                />
                <span className="ml-2">Submit</span>
              </>
            ) : (
              'Submit'
            )}
          </Button>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                disabled={isPending}
                type="button"
                variant="outline"
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </form>
    </Form>
  );
}
