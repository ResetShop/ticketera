CREATE TABLE IF NOT EXISTS "event" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"alt_organizer" text,
	"image_url" text,
	"people_limit" integer NOT NULL,
	"venue_name" text NOT NULL,
	"venue_address" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"enabled" boolean DEFAULT true,
	"deleted" boolean DEFAULT false
);
