ALTER TABLE "book" RENAME TO "books";--> statement-breakpoint
ALTER TABLE "books" DROP CONSTRAINT "book_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "author" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "genre" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "volumes" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "volumes_completed" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "pages" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "pages_read" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "rating" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "books" ADD CONSTRAINT "books_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
