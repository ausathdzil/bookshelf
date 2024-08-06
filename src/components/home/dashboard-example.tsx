import DashboardChartExample from '@/components/home/dashboard-chart-example';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { StarIcon } from 'lucide-react';

type Book = {
  title: string;
  genre: string;
  pages: number;
  pagesRead: number;
  status: string;
  rating: number;
};

const books: Book[] = [
  {
    title: 'Crime and Punishment',
    genre: 'Literary Fiction',
    pages: 527,
    pagesRead: 105,
    status: 'Reading',
    rating: 4,
  },
  {
    title: `Harry Potter and the Philosopher's Stone`,
    genre: 'Fantasy',
    pages: 223,
    pagesRead: 223,
    status: 'Finished',
    rating: 5,
  },
];

export default function DashboardExample() {
  return (
    <section className="w-full flex gap-4 px-36">
      <div className="w-1/2 space-y-4">
        {books.map((book: Book) => (
          <Card key={book.title}>
            <CardHeader>
              <CardTitle>{book.title}</CardTitle>
              <CardDescription>{book.genre}</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress
                className={
                  book.status === 'Finished'
                    ? '[&>*]:bg-blue-500'
                    : '[&>*]:bg-emerald-500'
                }
                value={(book.pagesRead / book.pages) * 100}
              />
            </CardContent>
            <CardFooter className="justify-between items-center">
              <div className="flex gap-4">
                <p>{book.status}</p>
                <p>
                  <span
                    className={
                      book.status === 'Finished'
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
                {Array.from({ length: book.rating }).map((_, index) => (
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
        ))}
      </div>
      <div className='w-1/2'>
        <DashboardChartExample />
      </div>
    </section>
  );
}
