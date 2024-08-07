import { db } from '@/db';
import { books, SelectBook } from '@/schema';
import { eq } from 'drizzle-orm';

export async function updateBook(
  id: SelectBook['id'],
  data: Partial<Omit<SelectBook, 'id'>>
) {
  await db.update(books).set(data).where(eq(books.id, id));
}
