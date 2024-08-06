CREATE TABLE IF NOT EXISTS "event" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"alt_organizer" text,
	"imageUrl" text,
	"people_limit" integer NOT NULL,
	"venue_name" text NOT NULL,
	"venue_address" text NOT NULL,
	"created_by" serial NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"enabled" boolean DEFAULT true,
	"deleted" boolean DEFAULT false
);
--> statement-breakpoint
ALTER TABLE "ticket" ADD COLUMN "id_event" serial NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ticket" ADD CONSTRAINT "ticket_id_event_event_id_fk" FOREIGN KEY ("id_event") REFERENCES "event"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "event" ADD CONSTRAINT "event_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
