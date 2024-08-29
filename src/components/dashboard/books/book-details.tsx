import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { SelectBook } from '@/db/schema';
import clsx from 'clsx';
import { PencilIcon } from 'lucide-react';
import Link from 'next/link';

export default function BookDetails({ book }: { book: SelectBook }) {
  return (
    <>
      <div className="w-full flex justify-between items-start">
        <div className="w-full space-y-4">
          <article className="space-y-1">
            <h1 className="text-2xl font-bold">{book.title}</h1>
            <p className="text-muted-foreground">{book.author}</p>
            <p className="text-muted-foreground">{book.genre}</p>
          </article>
          <div className="space-x-2">
            <Badge
              className={clsx({
                'bg-blue-500': book.status === 'Completed',
                'bg-green-500': book.status === 'Reading',
              })}
            >
              {book.status}
            </Badge>
            <Badge
              className={clsx({
                'border-yellow-400': book.rating && book.rating === 5,
                'border-purple-400': book.rating && book.rating < 5,
                'border-red-400': book.rating && book.rating < 2,
              })}
              variant="outline"
            >
              {book.rating === 0 ? 'Unrated' : `${book.rating} ⭐`}
            </Badge>
          </div>
        </div>
        <Link href={`/dashboard/books/${book.id}/edit`}>
          <Button
            className="flex gap-4"
            variant="outline"
          >
            <span>Edit Book</span>
            <PencilIcon size={16} />
          </Button>
        </Link>
      </div>
      <div className="w-full space-y-4">
        <p>{book.description}</p>
        <div className="w-1/2 flex gap-4">
          <Card className="w-full">
            <CardHeader className="space-y-4">
              <CardTitle>Volumes</CardTitle>
              <Progress
                className={
                  book.status === 'Completed'
                    ? '[&>*]:bg-blue-500'
                    : '[&>*]:bg-emerald-500'
                }
                value={(book.volumesCompleted / book.volumes) * 100}
              />
              <p>
                {book.volumesCompleted} / {book.volumes}
              </p>
            </CardHeader>
          </Card>
          <Card className="w-full">
            <CardHeader className="space-y-4">
              <CardTitle>Pages</CardTitle>
              <Progress
                className={
                  book.status === 'Completed'
                    ? '[&>*]:bg-blue-500'
                    : '[&>*]:bg-emerald-500'
                }
                value={(book.pagesRead / book.pages) * 100}
              />
              <p>
                {book.pagesRead} / {book.pages}
              </p>
            </CardHeader>
          </Card>
        </div>
      </div>
    </>
  );
}
