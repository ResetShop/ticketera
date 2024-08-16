DO $$ BEGIN
 ALTER TABLE "ticket" ADD CONSTRAINT "ticket_id_event_event_id_fk" FOREIGN KEY ("id_event") REFERENCES "event"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
