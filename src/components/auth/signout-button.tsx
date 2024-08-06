import { signOut } from '@/auth';
import { Button } from '@/components/ui/button';

export default function SignOut() {
  return (
    <form
      className="w-full"
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <Button
        type="submit"
        variant="destructive"
        className="w-full"
      >
        Sign Out
      </Button>
    </form>
  );
}
