import CreateBookForm from '@/components/forms/create-book-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default async function AddBookDialog({ userId }: { userId: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add book</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add book</DialogTitle>
          <DialogDescription>Add a book to your bookshelf.</DialogDescription>
        </DialogHeader>
        <CreateBookForm userId={userId} />
      </DialogContent>
    </Dialog>
  );
}
