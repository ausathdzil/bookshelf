import { db } from '@/db';
import { books, SelectBook, SelectUser, users } from '@/db/schema';
import { and, desc, eq } from 'drizzle-orm';

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

export async function getBooksByUserId(id: SelectBook['userId']): Promise<
  Array<{
    id: string;
    title: string;
    author: string;
    genre: string;
    description: string;
    volumes: number;
    volumesCompleted: number;
    pages: number;
    pagesRead: number;
    status: string;
    rating: number;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  }>
> {
  try {
    return db
      .select()
      .from(books)
      .where(eq(books.userId, id))
      .orderBy(desc(books.updatedAt));
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch books data');
  }
}

export async function getBookById(
  id: SelectBook['id'],
  userId: SelectBook['userId']
): Promise<
  Array<{
    id: string;
    title: string;
    author: string;
    genre: string;
    description: string;
    volumes: number;
    volumesCompleted: number;
    pages: number;
    pagesRead: number;
    status: string;
    rating: number;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  }>
> {
  try {
    return db
      .select()
      .from(books)
      .where(and(eq(books.id, id), eq(books.userId, userId)));
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch book data');
  }
}
