import { Skeleton } from '@/components/ui/skeleton';

export default function ProfileSectionSkeleton() {
  return (
    <div className="w-full flex items-start gap-16">
      <div className="flex flex-col items-center space-y-4">
        <Skeleton className="w-[167px] h-[300px] rounded-lg" />
      </div>
      <div className="w-full flex gap-6">
        <ul className="w-1/2 space-y-6">
          {Array.from({ length: 2 })
            .fill(0)
            .map((_, index) => (
              <li key={index}>
                <Skeleton className="w-[456px] h-[188px] rounded-lg" />
              </li>
            ))}
        </ul>
        <Skeleton className="w-[455px] h-[398px] rounded-lg" />
      </div>
    </div>
  );
}
