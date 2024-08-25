import { auth } from '@/auth';
import BooksSection from '@/components/dashboard/overview/books-section';
import ProfileSection from '@/components/dashboard/overview/profile-section';
import BooksSectionSkeleton from '@/components/skeletons/books-section-skeleton';
import ProfileSectionSkeleton from '@/components/skeletons/profile-section-skeleton';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getBooksByUserId } from '@/lib/data';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function Page() {
  const session = await auth();
  const user = session?.user;
  const books = user ? await getBooksByUserId(user.id as string) : [];

  return (
    <section className="w-full flex flex-col justify-center items-start gap-4 px-44">
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
      <div className="w-full space-y-6">
        <h1 className="text-3xl font-bold">Profile</h1>
        <Separator />
        <Suspense fallback={<ProfileSectionSkeleton />}>
          <ProfileSection
            user={user}
            books={books}
          />
        </Suspense>
        <Separator />
      </div>
      <div className="w-full space-y-6">
        <h1 className="text-3xl text-center font-bold">Books</h1>
        <Separator />
        <Suspense fallback={<BooksSectionSkeleton />}>
          <BooksSection
            user={user}
            books={books}
          />
        </Suspense>
        <div className="w-full text-right">
          <Link href="dashboard/books">
            <Button
              className="text-lg"
              variant="link"
            >
              View all books{' '}
              <span className="ml-2">
                <ArrowRight />
              </span>
            </Button>
          </Link>
        </div>
        <Separator />
      </div>
    </section>
  );
}
