import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { SelectBook } from '@/db/schema';
import { StarIcon } from 'lucide-react';

export default function RecentBookCard({ book }: { book: SelectBook }) {
  return (
    <Card key={book.id}>
      <CardHeader>
        <CardTitle>
          {book.title.length > 30
            ? book.title.substring(0, 30).concat('...')
            : book.title}
        </CardTitle>
        <CardDescription>{book.genre}</CardDescription>
      </CardHeader>
      <CardContent>
        <Progress
          className={
            book.status === 'Completed'
              ? '[&>*]:bg-blue-500'
              : '[&>*]:bg-emerald-500'
          }
          value={
            book.pages && book.pagesRead
              ? (book.pagesRead / book.pages) * 100
              : 0
          }
        />
      </CardContent>
      <CardFooter className="justify-between items-center">
        <div className="flex gap-4">
          <p>{book.status}</p>
          <p>
            <span
              className={
                book.status === 'Completed'
                  ? 'text-blue-500'
                  : 'text-emerald-500'
              }
            >
              {book.pagesRead}
            </span>{' '}
            / {book.pages}
          </p>
        </div>
        <div className="flex gap-2">
          {Array.from({ length: book.rating ?? 0 }).map((_, index) => (
            <StarIcon
              key={index}
              className="w-4 h-4"
              color="orange"
              fill="orange"
            />
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
