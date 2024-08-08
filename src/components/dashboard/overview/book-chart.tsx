'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Separator } from '@/components/ui/separator';
import { SelectBook } from '@/schema';
import { Label, Pie, PieChart } from 'recharts';

export default function BookChart({ books }: { books: SelectBook[] }) {
  const totalBooks = books.length;
  const completedBooks = books.filter(
    (book) => book.status === 'Completed'
  ).length;
  const readingBooks = totalBooks - completedBooks;

  const totalPages = books.reduce(
    (acc, book) => (book.pagesRead ? book.pagesRead : 0) + acc,
    0
  );

  const chartData = [
    { status: 'reading', count: readingBooks, fill: 'var(--color-reading)' },
    {
      status: 'completed',
      count: completedBooks,
      fill: 'var(--color-completed)',
    },
  ];

  const chartConfig = {
    count: {
      label: 'Books',
    },
    reading: {
      label: 'Reading',
      color: 'hsl(var(--chart-1))',
    },
    completed: {
      label: 'Completed',
      color: 'hsl(var(--chart-2))',
    },
  };

  return (
    <Card className="flex flex-col w-1/2">
      <CardHeader className="items-center pb-0">
        <CardTitle>Bookshelf Stats</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalBooks.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Books
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="justify-center gap-4 text-sm">
        <div className="flex flex-col gap-4">
          <dl className="flex justify-between gap-6">
            <dt>Reading</dt>
            <dd>{readingBooks}</dd>
          </dl>
          <Separator />
          <dl className="flex justify-between gap-6">
            <dt>Completed</dt>
            <dd>{completedBooks}</dd>
          </dl>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col gap-4">
          <dl className="flex justify-between gap-6">
            <dt>Total Entries</dt>
            <dd>{totalBooks}</dd>
          </dl>
          <Separator />
          <dl className="flex justify-between gap-6">
            <dt>Pages</dt>
            <dd>{totalPages}</dd>
          </dl>
        </div>
      </CardFooter>
    </Card>
  );
}
