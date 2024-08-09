'use server';

import { db } from '@/db';
import { InsertBook, books } from '@/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const BookSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(255),
  author: z.string().max(255),
  genre: z.string().max(255),
  description: z.string().max(255),
  volumes: z.number().int().positive(),
  volumesCompleted: z.number().int().positive(),
  pages: z.number().int().positive(),
  pagesRead: z.number().int().positive(),
  status: z.string().max(255),
  rating: z.number().int().positive(),
  userId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const CreateBook = BookSchema.omit({ id: true });

export async function createBook(formData: FormData) {
  const validateFields = CreateBook.safeParse({
    title: formData.get('title'),
    author: formData.get('author'),
    genre: formData.get('genre'),
    description: formData.get('description'),
    volumes: Number(formData.get('volumes')),
    volumesCompleted: Number(formData.get('volumesCompleted')),
    pages: Number(formData.get('pages')),
    pagesRead: Number(formData.get('pagesRead')),
    status: formData.get('status'),
    rating: Number(formData.get('rating')),
    userId: formData.get('userId'),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  if (!validateFields.success) {
    throw new Error(validateFields.error.errors[0].message);
  }

  const data = validateFields.data as InsertBook;

  await db.insert(books).values(data);

  revalidatePath(`/${data.userId}/dashboard`);
  redirect(`/${data.userId}/dashboard`);
}
