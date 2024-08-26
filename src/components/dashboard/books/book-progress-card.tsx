import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { SelectBook } from '@/db/schema';
import { StarIcon } from 'lucide-react';

export default function BookProgressCard({ book }: { book: SelectBook }) {
  return (
    <Card key={book.title}>
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
        <CardDescription>{book.genre}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Separator />
        <h1>Volumes</h1>
        <Progress
          className={
            book.status === 'Completed'
              ? '[&>*]:bg-blue-500'
              : '[&>*]:bg-emerald-500'
          }
          value={
            book.volumes && book.volumesCompleted
              ? (book.volumesCompleted / book.volumes) * 100
              : 0
          }
        />
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
              {book.volumesCompleted}
            </span>{' '}
            / {book.volumes}
          </p>
        </div>
        <h1>Pages</h1>
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
        <Separator />
      </CardContent>
      <CardFooter>
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
