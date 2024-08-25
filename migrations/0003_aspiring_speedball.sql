DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('Reading', 'Completed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "books" 
ALTER COLUMN "status" TYPE "public"."status" 
USING ("status"::text::"public"."status");