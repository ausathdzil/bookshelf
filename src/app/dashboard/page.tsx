import { auth } from '@/auth';
import BooksSection from '@/components/dashboard/overview/books-section';
import ProfileSection from '@/components/dashboard/overview/profile-section';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb';
import { getBooksByUserId } from '@/lib/data';
import Link from 'next/link';

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
        <ProfileSection
          user={user}
          books={books}
        />
      </div>
      <div className="w-full space-y-6">
        <BooksSection
          user={user}
          books={books}
        />
      </div>
    </section>
  );
}
