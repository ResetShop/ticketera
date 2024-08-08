import * as schemas from '../schemas/ticket';
import * as sellerService from '../seller/seller.service';
import { pgClient } from '../_helpers/postgres-connector'
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm'

const db = drizzle(pgClient, { schema: { ...schemas } });

export async function getById(id: number) {
    return db.query.ticket.findFirst({ where: eq(schemas.ticket.id, id) })
}

export async function getByUUID(uuid: string) {
    return db.query.ticket.findFirst({ where: eq(schemas.ticket.qrString, uuid) })
}

export async function getAll() {
    return db.query.ticket.findMany();
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

    const res = await db.insert(schemas.ticket).values(newTicket).returning();
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
            .update(schemas.ticket)
            .set(updatedTicket)
            .where(eq(schemas.ticket.id, ticket.id))
            .returning();
    return result;
}
