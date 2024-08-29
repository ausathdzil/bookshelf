import { Skeleton } from '@/components/ui/skeleton';

export default function BookDetailsSkeleton() {
  return (
    <>
      <div className="w-full flex justify-between items-start">
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Skeleton className="w-[309px] h-[32px] rounded-lg" />
            <Skeleton className="w-[309px] h-[24px] rounded-lg" />
            <Skeleton className="w-[309px] h-[24px] rounded-lg" />
          </div>
          <Skeleton className="w-[150px] h-[24px] rounded-lg" />
        </div>
      </div>
      <div className="w-full space-y-4">
        <Skeleton className="w-[1167px] h-[86px] rounded-lg" />
        <div className="w-1/2 flex gap-4">
          <Skeleton className="w-[282px] h-[144px] rounded-lg" />
          <Skeleton className="w-[282px] h-[144px] rounded-lg" />
        </div>
      </div>
    </>
  );
}
