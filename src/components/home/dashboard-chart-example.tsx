'use client';

import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { status: 'reading', count: 9, fill: 'var(--color-reading)' },
  { status: 'finished', count: 35, fill: 'var(--color-finished)' },
];

const chartConfig = {
  count: {
    label: 'Books',
  },
  reading: {
    label: 'Reading',
    color: 'hsl(var(--chart-1))',
  },
  finished: {
    label: 'Finished',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export default function DashboardChartExample() {
  const totalBooks = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, []);

  return (
    <Card className="flex flex-col">
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
      <CardFooter className="justify-center gap-16 text-sm">
        <div className="flex flex-col gap-2 w-1/4">
          <dl className="flex justify-between">
            <dt>Reading</dt>
            <dd>9</dd>
          </dl>
          <dl className="flex justify-between">
            <dt>Finished</dt>
            <dd>35</dd>
          </dl>
        </div>
        <div className="flex flex-col gap-2 w-1/4">
          <dl className="flex justify-between">
            <dt>Total Entries</dt>
            <dd>44</dd>
          </dl>
          <dl className="flex justify-between">
            <dt>Pages</dt>
            <dd>328</dd>
          </dl>
        </div>
      </CardFooter>
    </Card>
  );
}
