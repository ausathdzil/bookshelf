import { Provider } from '@/app/signin/page';
import { signIn } from '@/auth';
import { SignInButton } from '@/components/auth/signin-button';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

export default function SignInForm({ provider }: { provider: Provider }) {
  return (
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
      <SignInButton provider={provider} />
    </form>
  );
}
