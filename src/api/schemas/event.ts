import { boolean, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

// Schemas
import { user } from './user'

export const event = pgTable('event', {
    id: serial('id').primaryKey(),
    name: text('name'),
    description: text('description'),
    startDate: timestamp('start_date'),
    endDate: timestamp('end_date'),
    altOrganizer: text('alt_organizer'),
    imageUrl: text('imageUrl'),
    peopleLimit: integer('people_limit'),
    venueName: text('venue_name'),
    venueAddress: text('venue_address'),

    // Audit fields
    createdBy: serial('created_by').references(() => user.id),
    createdAt: timestamp('created_at'),
    updatedAt: timestamp('updated_at'),
    enabled: boolean('enabled'),
    deleted: boolean('deleted'),
})
