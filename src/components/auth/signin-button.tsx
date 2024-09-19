'use client';

import { Provider } from '@/app/signin/page';
import { GitHubIcon, GoogleIcon } from '@/components/icons/icons';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

export function SignInButton({ provider }: { provider: Provider }) {
  const { pending } = useFormStatus();

  return (
    <Button
      className="w-full flex items-center justify-center gap-2"
      variant="outline"
      type="submit"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2
            size={16}
            className="animate-spin"
          />
          <span>Sign in with {provider.name}</span>
        </>
      ) : (
        <>
          {provider.name === 'Google' ? <GoogleIcon /> : <GitHubIcon />}
          <span>Sign in with {provider.name}</span>
        </>
      )}
    </Button>
  );
}
