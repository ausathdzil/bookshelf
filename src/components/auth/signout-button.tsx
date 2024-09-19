import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function SignOut() {
  return (
    <Dialog>
      <DialogTrigger className="w-full p-2">
        <Button
          className="w-full"
          variant="destructive"
        >
          Sign Out
        </Button>
      </DialogTrigger>
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
    </Dialog>
  );
}
