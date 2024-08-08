import * as ticketSchemas from '../schemas/ticket';
import * as eventSchemas from '../schemas/events';
import * as sellerService from '../seller/seller.service';

import { pgClient } from '../_helpers/postgres-connector'
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm'

const db = drizzle(pgClient, { schema: { ...eventSchemas, ...ticketSchemas } });

export async function getById(id: number) {
    return db.query.ticket.findFirst({ with: { event: true }, where: eq(ticketSchemas.ticket.id, id) })
}

export async function getByUUID(uuid: string) {
    return db.query.ticket.findFirst({ with: { event: true }, where: eq(ticketSchemas.ticket.qrString, uuid) })
}

export async function getAll() {
    return db.query.ticket.findMany({ with: { event: true } });
}

export async function create({ cost, firstName, lastName, email, phone, dni, createdBy, event }: any) {
    const seller = await sellerService.getByUserId(createdBy);

    const newTicket = {
        cost: cost,
        firstName: firstName,
        lastName: lastName,
        qrString: crypto.randomUUID(),
        email: email,
        phone: phone,
        dni: dni,
        createdAt: new Date(),
        updatedAt: new Date(),
        enabled: false,
        deleted: false,
        createdBy: seller?.id ?? 0,
        idEvent: event.id
    }

    const res = await db.insert(ticketSchemas.ticket).values(newTicket).returning();
    return res;
}

export async function redeem(uuid: string) {
    const ticket = await getByUUID(uuid);
    if (!ticket) {
        throw new Error('No se encontró el ticket!');
    }

    if (ticket.enabled) {
        throw new Error('El ticket ya se redimió!');
    }

    const updatedTicket = {
        ...ticket,
        enabled: true,
        updatedAt: new Date()
    }

    const result =
        await db
            .update(ticketSchemas.ticket)
            .set(updatedTicket)
            .where(eq(ticketSchemas.ticket.id, ticket.id))
            .returning();
    return result;
}
