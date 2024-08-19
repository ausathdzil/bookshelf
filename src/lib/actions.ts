'use server';

import { db } from '@/db';
import { books, InsertBook } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const FormSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  author: z.string(),
  genre: z.string(),
  description: z.string(),
  volumes: z.coerce.number().int(),
  volumesRead: z.coerce.number().int(),
  pages: z.coerce.number().int(),
  pagesRead: z.coerce.number().int(),
  status: z.enum(['Reading', 'Completed']),
  rating: z.coerce.number().int(),
  userId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const CreateBook = FormSchema.omit({
  id: true,
  description: true,
  pagesRead: true,
  volumesRead: true,
  rating: true,
  status: true,
  createdAt: true,
  updatedAt: true,
});

export async function createBook(formData: FormData) {
  const validatedFields = CreateBook.safeParse({
    title: formData.get('title'),
    author: formData.get('author'),
    genre: formData.get('genre'),
    volumes: formData.get('volumes'),
    pages: formData.get('pages'),
    userId: formData.get('userId'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Book.',
    };
  }

  const { title, author, genre, volumes, pages, userId } = validatedFields.data;

  const description = '';
  const pagesRead = 0;
  const volumesCompleted = 0;
  const rating = 0;
  const status = 'Reading';
  const createdAt = new Date();
  const updatedAt = new Date();

  const data = {
    title,
    author,
    genre,
    description,
    volumes,
    volumesCompleted,
    pages,
    pagesRead,
    status,
    rating,
    userId,
    createdAt,
    updatedAt,
  } as InsertBook;

  await db.insert(books).values(data);

  revalidatePath(`/dashboard`);
}

export async function deleteBook(id: string) {
  await db.delete(books).where(eq(books.id, id));
  revalidatePath(`/dashboard/books`);
}
