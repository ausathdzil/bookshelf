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
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const UpdateBookFormSchema = z.object({
  description: z.string(),
  volumesCompleted: z.string(),
  pagesRead: z.string(),
  status: z.string(),
  rating: z.string(),
});

export default function UpdateBookForm({
  id,
  userId,
  book,
}: {
  id: string;
  userId: string;
  book: SelectBook;
}) {
  const [isPending, startTransition] = useTransition();
  
  const form = useForm<z.infer<typeof UpdateBookFormSchema>>({
    resolver: zodResolver(UpdateBookFormSchema),
    defaultValues: {
      description: book.description,
      volumesCompleted: book.volumesCompleted.toString(),
      pagesRead: book.pagesRead.toString(),
      status: book.status,
      rating: book.rating.toString(),
    },
  });

  async function onSubmit(values: z.infer<typeof UpdateBookFormSchema>) {
    const formData = new FormData();
    formData.append('description', values.description);
    formData.append('volumesCompleted', values.volumesCompleted);
    formData.append('pagesRead', values.pagesRead);
    formData.append('status', values.status);
    formData.append('rating', values.rating);

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
        className="space-y-4"
      >
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
          name="volumesCompleted"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Volumes Completed</FormLabel>
              <FormControl>
                <Input
                  placeholder={book.volumesCompleted.toString()}
                  type="number"
                  {...field}
                />
              </FormControl>
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
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={book.rating === 0 ? 'Rate this book' : ''}
                    />
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
          Submit
        </Button>
      </form>
    </Form>
  );
}
