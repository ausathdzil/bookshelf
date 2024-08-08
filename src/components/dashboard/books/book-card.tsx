import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SelectBook } from '@/schema';
import clsx from 'clsx';

export default function BookCard({ book }: { book: SelectBook }) {
  return (
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
          Volume: {book.volume} / {book.volumeCompleted}
        </p>
        <p>
          Pages: {book.pagesRead} / {book.pages}
        </p>
        <p>Rating: {book.rating} / 5</p>
      </CardContent>
    </Card>
  );
}
