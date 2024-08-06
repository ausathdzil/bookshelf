import { providerMap, signIn } from '@/auth';
import { Button } from '@/components/ui/button';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  console.log(providerMap);
  return (
    <div className="flex flex-col gap-2">
      {Object.values(providerMap).map((provider) => (
        <form
          key={provider.id}
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
          >
            Sign in with {provider.name}
          </Button>
        </form>
      ))}
    </div>
  );
}
