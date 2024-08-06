import { providerMap, signIn } from '@/auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LibraryBig } from 'lucide-react';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  return (
    <section className="flex flex-col items-center gap-8">
      <LibraryBig className="w-16 h-16" />
      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Join us now to start tracking your books.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.values(providerMap).map((provider) => (
            <form
              key={provider.id}
              className="w-full"
              action={async () => {
                'use server';
                try {
                  await signIn(provider.id, { redirectTo: '/' });
                } catch (error) {
                  if (error instanceof AuthError) {
                    return redirect(`/`);
                  }

                  throw error;
                }
              }}
            >
              <Button
                variant="outline"
                type="submit"
                className="w-full"
              >
                Sign in with {provider.name}
              </Button>
            </form>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
