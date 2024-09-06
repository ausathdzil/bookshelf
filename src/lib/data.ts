import { db } from '@/db';
import { books, SelectBook } from '@/db/schema';
import { and, desc, eq } from 'drizzle-orm';

export async function getBooksByUserId(
  id: SelectBook['userId']
): Promise<Array<SelectBook>> {
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
): Promise<Array<SelectBook>> {
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

export interface OpenLibraryBook {
  url: string;
  key: string;
  title: string;
  subtitle: string;
  authors: Array<{ url: string; name: string }>;
  number_of_pages: number;
  subjects: Array<{ name: string; url: string }>;
  cover: { small: string; medium: string; large: string };
}

export async function fetchBookByISBN(isbn: string): Promise<OpenLibraryBook> {
  try {
    const res = await fetch(
      `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    return data[`ISBN:${isbn}`];
  } catch (error) {
    console.error('Error fetching books:', error);
    throw new Error('Failed to fetch books by isbn');
  }
}
