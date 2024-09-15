import SignInForm from '@/components/forms/signin-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LibraryBig } from 'lucide-react';

export interface Provider {
  id: string;
  name: string;
}

const providers: Provider[] = [
  {
    id: 'google',
    name: 'Google',
  },
  {
    id: 'github',
    name: 'GitHub',
  },
];

export default function Page() {
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
            <SignInForm
              key={provider.id}
              provider={provider}
            />
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
