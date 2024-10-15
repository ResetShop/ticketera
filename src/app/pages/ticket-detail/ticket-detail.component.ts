import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';
import { TicketService } from 'src/app/providers/ticket.service';
import { EventService } from 'src/app/providers/event.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, Observable, switchMap } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Ticket } from '../../interfaces/ticket.model';

@Component({
	selector: 'ticketera-ticket-detail',
	standalone: true,
	imports: [CommonModule, QRCodeModule],
	template: `
		@if (ticket$ | async; as ticket) {
			<div class="m-5 grid rounded bg-white p-5 text-center drop-shadow">
				<div class="flex justify-between">
					<p class="text-xl font-bold">{{selectedEvent$.value?.name}}</p>
					<span class="whitespace-nowrap rounded-full bg-gray-100 px-2.5 py-0.5 text-sm text-gray-700">
						Entrada #{{ ticket?.id }}
					</span>
				</div>
				<div class="mt-5 grid grid-cols-2">
					<div class="text-left">
						{{selectedEvent$.value?.startDate | date: 'dd/MM/yyyy' }} <br />
						{{selectedEvent$.value?.startDate | date: 'h:mm a' }}
					</div>
					<div class="text-right"><span class="font-bold">{{selectedEvent$.value?.venueName}}</span><br />{{selectedEvent$.value?.venueAddress}}</div>
				</div>
				<qrcode [qrdata]="ticket.qrString" [width]="256" [errorCorrectionLevel]="'M'" class="mx-auto"></qrcode>
				<p class="text-2xl font-bold">{{ ticket?.lastName?.toUpperCase() }}, {{ ticket?.firstName }}</p>
				<p class="text-2xl font-bold">{{ ticket?.dni }}</p>
				<a [href]="ticket.whatsappUrl" target="_blank">
					<button
						class="mt-5 flex w-full justify-center rounded bg-success px-4 py-2 font-bold text-white drop-shadow hover:bg-success-dark"
					>
						<img class="mr-1 h-5" src="/assets/img/icons/whatsapp-white.svg" alt="" />
						<span>ENVIAR POR WHATSAPP</span>
					</button>
				</a>
			</div>
		}
	`,
	styleUrl: './ticket-detail.component.scss',
})
export class TicketDetailComponent {
	readonly environment = environment;

	private route = inject(ActivatedRoute);
	private ticketService = inject(TicketService);
	private eventService = inject(EventService);

	ticket$: Observable<Ticket & { whatsappUrl: string }> = this.route.params.pipe(
		takeUntilDestroyed(),
		switchMap(({ id }) => this.ticketService.getTicketByID(id)),
		map((ticket) => ({ ...ticket, whatsappUrl: this.ticketService.generateTicketWhatsappURL(ticket) })),
	);

	selectedEvent$ = this.eventService.selectedEvent$
}
