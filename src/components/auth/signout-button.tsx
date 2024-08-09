import { signOut } from '@/auth';
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
    <>
      <Dialog>
        <DialogTrigger className="w-full p-2">
          <Button
            className="w-full"
            variant="destructive"
          >
            Sign Out
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Sign Out</DialogTitle>
            <DialogDescription>Continue Sign Out?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <Button
                type="submit"
                variant="destructive"
              >
                Sign Out
              </Button>
            </form>
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
    </>
  );
}
