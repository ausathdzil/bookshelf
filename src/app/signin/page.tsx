import { signIn } from '@/auth';
import { GitHubIcon, GoogleIcon } from '@/components/icons/icons';
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

const providers = [
  {
    id: 'google',
    name: 'Google',
    icon: GoogleIcon,
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: GitHubIcon,
  },
];

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
          {providers.map((provider) => (
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
                className="w-full flex items-center justify-center gap-2"
              >
                <provider.icon />
                <span>Sign in with {provider.name}</span>
              </Button>
            </form>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
