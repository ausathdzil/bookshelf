import OverviewSection from '@/components/dashboard/overview/overview-section';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';

export default function Page() {
  return (
    <section className="w-full flex flex-col justify-center items-start gap-4 sm:px-44">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                className="text-foreground"
                href="/dashboard"
              >
                Dashboard
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <OverviewSection />
    </section>
  );
}
