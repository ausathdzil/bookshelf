import { db } from '@/db';
import { InsertBook, books } from '@/schema';

export async function createBook(data: InsertBook) {
  await db.insert(books).values(data);
}
