import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { signOut } from 'next-auth/react';

export default function SignOut() {
  return (
    <DialogContent className="w-48 sm:w-96 rounded-lg">
      <DialogHeader>
        <DialogTitle>Sign Out</DialogTitle>
        <DialogDescription>Continue Sign Out?</DialogDescription>
      </DialogHeader>
      <DialogFooter className="gap-4 sm:gap-0">
        <Button
          type="submit"
          variant="destructive"
          onClick={() => signOut()}
        >
          Sign Out
        </Button>
        <DialogClose asChild>
          <Button
            type="button"
            variant="outline"
          >
            Cancel
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
