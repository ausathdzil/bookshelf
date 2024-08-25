import { Skeleton } from '@/components/ui/skeleton';

export default function BooksTableSkeleton() {
  return (
    <>
      <Skeleton className="w-[494px] h-[36px] rounded-lg" />
      <Skeleton className="w-[1167px] h-[319px] rounded-lg" />
    </>
  );
}
