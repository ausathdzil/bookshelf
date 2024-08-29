'use client';

import { Button } from '@/components/ui/button';
import { updateBookVolumesAndPages } from '@/lib/actions';
import { useTransition } from 'react';

export default function UpdateCardForm({
  volumesCompleted,
  pagesRead,
  id,
  userId,
}: {
  volumesCompleted: number;
  pagesRead: number;
  id: string;
  userId: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={async () => {
        const formData = new FormData();
        formData.append('volumesCompleted', volumesCompleted.toString());
        formData.append('pagesRead', pagesRead.toString());

        const updateBookWithId = updateBookVolumesAndPages.bind(null, id, userId);

        startTransition(async () => {
          await updateBookWithId(formData);
        });
      }}
    >
      <Button
        type="submit"
        disabled={isPending}
      >
        Update Book
      </Button>
    </form>
  );
}
