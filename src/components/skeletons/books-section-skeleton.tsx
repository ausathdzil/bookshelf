import { Skeleton } from '@/components/ui/skeleton';

export default function BooksSectionSkeleton() {
  return (
    <>
      <ul className="w-full grid grid-cols-5 gap-6">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
          <li key={index}>
            <Skeleton className="w-[208px] h-[288px] rounded-lg" />
          </li>
        ))}
      </ul>
    </>
  );
}
