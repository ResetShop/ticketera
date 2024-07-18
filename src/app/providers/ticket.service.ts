import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Ticket } from '../interfaces/ticket.model';
import { environment } from '../environments/environment'


@Injectable({
	providedIn: 'root',
})
export class TicketService {
	private http = inject(HttpClient);
	private readonly prefix = `/api/ticket`;

	getTicketByID(id: number): Observable<Ticket> {
		return this.http.get<Ticket>(`${this.prefix}/${id}`);
	}

	getTicketByUUID(uuid: string): Observable<Ticket> {
		return this.http.get<Ticket>(`${this.prefix}/uuid/${uuid}`);
	}

	getAllTickets(): Observable<Ticket[]> {
		return this.http.get<Ticket[]>(`${this.prefix}`);
	}

	createTicket(ticket: Ticket): Observable<Ticket> {
		return this.http.post<Ticket[]>(`${this.prefix}`, ticket).pipe(map((result) => result[0]));
	}

	generateTicketWhatsappURL(ticket: Ticket): string {
		return `https://api.whatsapp.com/send/?phone=549${ticket.phone}&text=Tu+entrada+para+%2AGUALICHO+FEST%2A%0A%0ALink%3A+${environment.redirectUri}/ticket-view/${ticket.qrString}&type=phone_number&app_absent=0`;
	}

	generateTicketQRURL(ticket: Ticket): string {
		return `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${ticket.qrString}`;
	}

	redeemTicket(ticket: Ticket) {
		return this.http.put<Ticket>(`${this.prefix}/redeem`, ticket);
	}
}
