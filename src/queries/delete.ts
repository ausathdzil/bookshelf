import { db } from '@/db';
import { books, SelectBook } from '@/schema';
import { eq } from 'drizzle-orm';

export async function deleteBook(id: SelectBook['id']) {
  await db.delete(books).where(eq(books.id, id));
}
