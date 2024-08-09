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
import { createBook } from '@/queries/insert';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const CreateBookFormSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: 'Title is required',
    })
    .max(255),
  author: z.string().max(255),
  genre: z.string().max(255),
  description: z.string().max(255),
  volumes: z.string(),
  volumesCompleted: z.string(),
  pages: z.string(),
  pagesRead: z.string(),
  status: z.string(),
  rating: z.string(),
  userId: z.string(),
});

export default function CreateBookForm({ userId }: { userId: string }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof CreateBookFormSchema>>({
    resolver: zodResolver(CreateBookFormSchema),
    defaultValues: {
      title: '',
      author: '',
      genre: '',
      description: '',
      volumes: '1',
      volumesCompleted: '1',
      pages: '1',
      pagesRead: '1',
      status: 'Reading',
      rating: '1',
      userId: userId,
    },
  });

  async function onSubmit(values: z.infer<typeof CreateBookFormSchema>) {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('author', values.author);
    formData.append('genre', values.genre);
    formData.append('description', values.description);
    formData.append('volumes', values.volumes);
    formData.append('volumesCompleted', values.volumesCompleted);
    formData.append('pages', values.pages);
    formData.append('pagesRead', values.pagesRead);
    formData.append('status', values.status);
    formData.append('rating', values.rating);
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
