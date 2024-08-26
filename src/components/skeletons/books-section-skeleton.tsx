import { Skeleton } from '@/components/ui/skeleton';

export default function BooksSectionSkeleton() {
  return (
    <>
      <ul className="w-full grid grid-cols-5 gap-6">
        {Array.from({ length: 9 })
          .fill(0)
          .map((_, index) => (
            <li key={index}>
              <Skeleton className="w-[208px] h-[288px] rounded-lg" />
            </li>
          ))}
      </ul>
    </>
  );
}
