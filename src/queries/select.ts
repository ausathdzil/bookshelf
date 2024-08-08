import { db } from '@/db';
import { books, SelectBook, SelectUser, users } from '@/schema';
import { desc, eq } from 'drizzle-orm';

export async function getUserById(id: SelectUser['id']): Promise<
  Array<{
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
  }>
> {
  return db.select().from(users).where(eq(users.id, id));
}

export async function getBooksByUserId(userId: SelectBook['userId']): Promise<
  Array<{
    id: string;
    title: string;
    author: string | null;
    genre: string | null;
    description: string | null;
    volume: number | null;
    volumeCompleted: number | null;
    pages: number | null;
    pagesRead: number | null;
    status: string | null;
    rating: number | null;
    image: string | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  }>
> {
  return db
    .select()
    .from(books)
    .where(eq(books.userId, userId))
    .orderBy(desc(books.updatedAt));
}
