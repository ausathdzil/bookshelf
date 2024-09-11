'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { SelectBook } from '@/db/schema';
import { updateBook } from '@/lib/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const UpdateBookFormSchema = z.object({
  title: z
    .string()
    .max(100, { message: 'Title should not exceed 100 characters.' }),
  author: z
    .string()
    .max(50, { message: 'Author should not exceed 50 characters.' }),
  genre: z
    .string()
    .max(50, { message: 'Genre should not exceed 50 characters.' }),
  description: z
    .string()
    .max(500, { message: 'Description should not exceed 500 characters.' }),
  pages: z.coerce.number().gte(0, {
    message: 'Pages should at least be 1',
  }),
  pagesRead: z.coerce.number().gte(0, {
    message: 'Pages read should at least be 0',
  }),
  status: z.enum(['Reading', 'Completed'], {
    invalid_type_error: 'Please select book status',
  }),
  rating: z.coerce.number().gte(0, {
    message: 'Rating should at least be 0',
  }),
});

export default function UpdateBookForm({
  id,
  userId,
  book,
}: {
  id: SelectBook['id'];
  userId: SelectBook['userId'];
  book: SelectBook;
}) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UpdateBookFormSchema>>({
    resolver: zodResolver(UpdateBookFormSchema),
    defaultValues: {
      title: book.title,
      author: book.author,
      genre: book.genre,
      description: book.description,
      pages: book.pages,
      pagesRead: book.pagesRead,
      status: book.status,
      rating: book.rating,
    },
  });

  async function onSubmit(values: z.infer<typeof UpdateBookFormSchema>) {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('author', values.author);
    formData.append('genre', values.genre);
    formData.append('description', values.description);
    formData.append('pages', values.pages.toString());
    formData.append('pagesRead', values.pagesRead.toString());
    formData.append('status', values.status);
    formData.append('rating', values.rating.toString());

    const updateBookWithId = updateBook.bind(null, id, userId);

    startTransition(async () => {
      await updateBookWithId(formData);
      form.reset();
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-1/2"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder={book.title}
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
                  placeholder={book.author}
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
                  placeholder={book.genre}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  placeholder="Add a description"
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
                  placeholder={book.pages.toString()}
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pagesRead"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pages Read</FormLabel>
              <FormControl>
                <Input
                  placeholder={book.pagesRead.toString()}
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={book.status} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Reading">Reading</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={
                  book.rating !== 0 ? field.value.toString() : undefined
                }
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Rate this book" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">1 ⭐</SelectItem>
                  <SelectItem value="2">2 ⭐</SelectItem>
                  <SelectItem value="3">3 ⭐</SelectItem>
                  <SelectItem value="4">4 ⭐</SelectItem>
                  <SelectItem value="5">5 ⭐</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
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
              <span className="ml-2">Update</span>
            </>
          ) : (
            'Update'
          )}
        </Button>
      </form>
    </Form>
  );
}
