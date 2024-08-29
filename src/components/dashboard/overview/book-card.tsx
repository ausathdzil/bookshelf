'use client';

import UpdateCardForm from '@/components/forms/update-card-form';
import { Button } from '@/components/ui/button';
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
import { updateBook } from '@/lib/actions';
import clsx from 'clsx';
import { StarIcon } from 'lucide-react';
import { useState } from 'react';

export default function BookCard({ book }: { book: SelectBook }) {
  const [volumesCompleted, setVolumesCompleted] = useState(
    book.volumesCompleted
  );
  const [pagesRead, setPagesRead] = useState(book.pagesRead);

  function updateVolumes(increment: number) {
    setVolumesCompleted(
      Math.max(0, Math.min(book.volumes, volumesCompleted + increment))
    );
  }

  function updatePages(increment: number) {
    setPagesRead(Math.max(0, Math.min(book.pages, pagesRead + increment)));
  }

  return (
    <Card
      className={clsx(
        { 'border-yellow-400': book.rating && book.rating === 5 },
        { 'border-purple-400': book.rating && book.rating < 5 },
        { 'border-red-400': book.rating && book.rating < 2 }
      )}
    >
      <CardHeader>
        <CardTitle className="text-base">{book.title}</CardTitle>
        <CardDescription className="flex gap-2">
          {Array.from({ length: book.rating ?? 0 }).map((_, index) => (
            <StarIcon
              key={index}
              className="w-4 h-4"
              color="orange"
              fill="orange"
            />
          ))}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <CardTitle className="text-xl">Volumes</CardTitle>
        <CardDescription>
          {volumesCompleted} / {book.volumes}
        </CardDescription>
        <div className="flex flex-col items-start gap-4">
          <Progress
            className={
              volumesCompleted === book.volumes
                ? '[&>*]:bg-blue-500'
                : '[&>*]:bg-emerald-500'
            }
            value={(volumesCompleted / book.volumes) * 100}
          />
          <div className="space-x-4">
            <Button
              className="rounded-full"
              variant="outline"
              size="icon"
              disabled={volumesCompleted === 0}
              onClick={() => updateVolumes(-1)}
            >
              -
            </Button>
            <Button
              className="rounded-full"
              variant="outline"
              size="icon"
              disabled={volumesCompleted === book.volumes}
              onClick={() => updateVolumes(1)}
            >
              +
            </Button>
          </div>
        </div>
        <CardTitle className="text-xl">Pages</CardTitle>
        <CardDescription>
          {pagesRead} / {book.pages}
        </CardDescription>
        <div className="flex flex-col items-start gap-4">
          <Progress
            className={
              pagesRead === book.pages
                ? '[&>*]:bg-blue-500'
                : '[&>*]:bg-emerald-500'
            }
            value={(pagesRead / book.pages) * 100}
          />
          <div className="space-x-4">
            <Button
              className="rounded-full"
              variant="outline"
              size="icon"
              disabled={pagesRead === 0}
              onClick={() => updatePages(-1)}
            >
              -
            </Button>
            <Button
              className="rounded-full"
              variant="outline"
              size="icon"
              disabled={pagesRead === book.pages}
              onClick={() => updatePages(1)}
            >
              +
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <UpdateCardForm
          book={book}
          volumesCompleted={volumesCompleted}
          pagesRead={pagesRead}
        />
      </CardFooter>
    </Card>
  );
}
