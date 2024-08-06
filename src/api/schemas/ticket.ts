import { boolean, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// Schemas
import { seller } from './seller';
import { event } from './event';

export const ticket = pgTable('ticket', {
	id: serial('id').primaryKey(),
	cost: integer('cost'),
	firstName: text('first_name'),
	lastName: text('last_name'),
	qrString: text('qr_string'),
	email: text('email'),
	phone: text('phone'),
	dni: text('dni'),
	createdBy: serial('created_by').references(() => seller.id),
	createdAt: timestamp('created_at'),
	updatedAt: timestamp('updated_at'),
	enabled: boolean('enabled'),
	deleted: boolean('deleted'),
	idEvent: serial('id_event').references(() => event.id),
});
