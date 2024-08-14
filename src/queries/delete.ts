'use server';

import { db } from '@/db';
import { books, SelectBook } from '@/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function deleteBook(
  id: SelectBook['id'],
  userId: SelectBook['userId']
) {
  await db.delete(books).where(eq(books.id, id));

  revalidatePath(`/${userId}/dashboard/books`);
}
