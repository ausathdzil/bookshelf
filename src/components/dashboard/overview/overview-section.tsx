import AddBookDialog from '@/components/dashboard/overview/add-book-dialog';
import BooksSection from '@/components/dashboard/overview/books-section';
import ProfileSection from '@/components/dashboard/overview/profile-section';
import BooksSectionSkeleton from '@/components/skeletons/books-section-skeleton';
import ProfileSectionSkeleton from '@/components/skeletons/profile-section-skeleton';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getBooksByUserId, getUser } from '@/lib/data';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function OverviewSection() {
  const user = await getUser();
  const books = await getBooksByUserId(user?.id as string);

  return (
    <>
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
          <BooksSection books={books} />
        </Suspense>
        <div className="w-full space-x-4 text-right">
          <AddBookDialog />
          <Link href="dashboard/books">
            <Button
              className="sm:text-lg"
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
    </>
  );
}
