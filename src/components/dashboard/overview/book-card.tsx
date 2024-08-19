import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SelectBook } from '@/db/schema';
import clsx from 'clsx';
import Link from 'next/link';

export default function BookCard({ book }: { book: SelectBook }) {
  return (
    <Link href={`/dashboard/books/${book.id}`}>
      <Card
        className={clsx(
          `w-52 h-72`,
          { 'border-yellow-400': book.rating && book.rating === 5 },
          { 'border-purple-400': book.rating && book.rating < 5 },
          { 'border-red-400': book.rating && book.rating < 2 }
        )}
      >
        <CardHeader>
          <CardTitle>{book.title}</CardTitle>
          <CardDescription>{book.genre}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Volumes: {book.volumesCompleted} / {book.volumes}
          </p>
          <p>
            Pages: {book.pagesRead} / {book.pages}
          </p>
          <p>Rating: {book.rating} / 5</p>
        </CardContent>
      </Card>
    </Link>
  );
}
