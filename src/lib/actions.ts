'use server';

import { db } from '@/db';
import { books, SelectBook } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const FormSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(100),
  author: z.string().min(1).max(50),
  genre: z.string().min(1).max(50),
  description: z.string(),
  pages: z.coerce.number().int().min(1),
  pagesRead: z.coerce.number().int().min(0),
  status: z.enum(['Reading', 'Completed']),
  rating: z.coerce.number().int().min(0),
  userId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const CreateBook = FormSchema.omit({
  id: true,
  description: true,
  pagesRead: true,
  status: true,
  rating: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export async function createBook(
  userId: SelectBook['userId'],
  formData: FormData
) {
  const validatedFields = CreateBook.safeParse({
    title: formData.get('title'),
    author: formData.get('author'),
    genre: formData.get('genre'),
    pages: formData.get('pages'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Book.',
    };
  }

  const { title, author, genre, pages } = validatedFields.data;

  const description = '';
  const pagesRead = 0;
  const rating = 0;
  const status: SelectBook['status'] = 'Reading';
  const createdAt = new Date();
  const updatedAt = new Date();

  const data = {
    title,
    author,
    genre,
    description,
    pages,
    pagesRead,
    status,
    rating,
    userId,
    createdAt,
    updatedAt,
  };

  try {
    await db.insert(books).values(data);
  } catch (error) {
    return {
      message: 'Failed to Create Book.',
    };
  }

  revalidatePath(`/dashboard`);
  redirect(`/dashboard`);
}

const UpdateBook = FormSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export async function updateBook(
  id: SelectBook['id'],
  userId: SelectBook['userId'],
  formData: FormData
) {
  const validatedFields = UpdateBook.safeParse({
    title: formData.get('title'),
    author: formData.get('author'),
    genre: formData.get('genre'),
    description: formData.get('description'),
    pages: formData.get('pages'),
    pagesRead: formData.get('pagesRead'),
    status: formData.get('status'),
    rating: formData.get('rating'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Book.',
    };
  }

  if (validatedFields.data.pagesRead > validatedFields.data.pages) {
    validatedFields.data.pagesRead = validatedFields.data.pages;
  }

  if (validatedFields.data.status === 'Completed') {
    validatedFields.data.pagesRead = validatedFields.data.pages;
  }

  const {
    title,
    author,
    genre,
    description,
    pages,
    pagesRead,
    status,
    rating,
  } = validatedFields.data;

  const data = {
    title,
    author,
    genre,
    description,
    pages,
    pagesRead,
    status,
    rating,
  };

  try {
    await db
      .update(books)
      .set(data)
      .where(and(eq(books.id, id), eq(books.userId, userId)));
  } catch (error) {
    return {
      message: 'Failed to Update Book.',
    };
  }

  revalidatePath(`/dashboard/books/${id}`);
  redirect(`/dashboard/books/${id}`);
}

const UpdateBookPages = FormSchema.omit({
  id: true,
  title: true,
  author: true,
  genre: true,
  description: true,
  pages: true,
  status: true,
  rating: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export async function updateBookPages(
  book: SelectBook,
  id: SelectBook['id'],
  userId: SelectBook['userId'],
  formData: FormData
) {
  const validatedFields = UpdateBookPages.safeParse({
    pagesRead: formData.get('pagesRead'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Book.',
    };
  }

  const { pagesRead } = validatedFields.data;

  const status: SelectBook['status'] =
    pagesRead === book.pages ? 'Completed' : 'Reading';

  const data = {
    pagesRead,
    status,
  };

  try {
    await db
      .update(books)
      .set(data)
      .where(and(eq(books.id, id), eq(books.userId, userId)));
  } catch (error) {
    return {
      message: 'Failed to Update Book.',
    };
  }

  revalidatePath(`/dashboard`);
}

export async function deleteBook(id: SelectBook['id']) {
  try {
    await db.delete(books).where(eq(books.id, id));
    revalidatePath(`/dashboard/books`);
  } catch (error) {
    return {
      message: 'Failed to Delete Book.',
    };
  }
}
