import { boolean, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

// Schemas
import { user } from './user'

export const event = pgTable('event', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    startDate: timestamp('start_date').notNull(),
    endDate: timestamp('end_date').notNull(),
    altOrganizer: text('alt_organizer'),
    imageUrl: text('image_url'),
    peopleLimit: integer('people_limit').notNull(),
    venueName: text('venue_name').notNull(),
    venueAddress: text('venue_address').notNull(),

    // Audit fields
    createdBy: serial('created_by').references(() => user.id),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    enabled: boolean('enabled').default(true),
    deleted: boolean('deleted').default(false),
})
