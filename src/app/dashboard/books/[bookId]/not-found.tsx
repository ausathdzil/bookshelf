import { Button } from '@/components/ui/button';
import { FrownIcon } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="w-full flex flex-col justify-center items-center gap-4 px-44">
      <FrownIcon size={30} />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested book.</p>
      <Link href="/dashboard/books">
        <Button>Go Back</Button>
      </Link>
    </section>
  );
}
