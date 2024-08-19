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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const CreateBookFormSchema = z.object({
  title: z.string(),
  author: z.string(),
  genre: z.string(),
  volumes: z.string(),
  pages: z.string(),
  userId: z.string(),
});

export default function CreateBookForm({ userId }: { userId: string }) {
  const form = useForm<z.infer<typeof CreateBookFormSchema>>({
    resolver: zodResolver(CreateBookFormSchema),
    defaultValues: {
      title: '',
      author: '',
      genre: '',
      volumes: '0',
      pages: '0',
      userId: userId,
    },
  });

  async function onSubmit(values: z.infer<typeof CreateBookFormSchema>) {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('author', values.author);
    formData.append('genre', values.genre);
    formData.append('volumes', values.volumes);
    formData.append('pages', values.pages);
    formData.append('userId', values.userId);

    try {
      await createBook(formData);
      form.reset();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
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
            name="volumes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Volumes</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Book volumes"
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
            <Button type="submit">Submit</Button>
            <DialogFooter>
              <DialogClose asChild>
                <Button
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
    </>
  );
}
