import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from 'src/app/providers/ticket.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs'
import { QRCodeModule } from 'angularx-qrcode';
import { EventService } from 'src/app/providers/event.service';


@Component({
	selector: 'ticketera-ticket-view',
	standalone: true,
	imports: [CommonModule, QRCodeModule],
	template: `
  @if(ticket$ | async; as ticket){
	<div #ticket>
		<div class="m-5 grid rounded bg-primary-dark text-white p-5 text-center drop-shadow">
			<img class="w-[300px] mx-auto" [src]="selectedEvent$.value?.imageUrl" alt="">
			<hr class="my-4">
			<div class="flex justify-between">
				<p class="font-bold text-xl">{{selectedEvent$.value?.name}}</p>
				<span class="whitespace-nowrap rounded-full bg-gray-100 px-2.5 py-0.5 text-sm text-gray-700">
			Entrada #{{ ticket?.id }}
			</span>
			</div>
			<div class="grid grid-cols-2 mt-5">
				<div class="text-left">
					{{selectedEvent$.value?.startDate | date: 'dd/MM/yyyy' : 'GMT-3' }} <br>
					{{selectedEvent$.value?.startDate | date: 'h:mm a' : 'GMT-3' }}
				</div>
				<div class="text-right"><span class="font-bold">
					{{selectedEvent$.value?.venueName}}</span><br>
					{{selectedEvent$.value?.venueAddress}}
				</div>
			</div>
			<img class="mx-auto rounded drop-shadow" [src]="ticket.qrUrl" alt="">
			<!--
				TODO: revisar qrcode para que funcione
				<qrcode class="mx-auto rounded drop-shadow" [qrdata]="ticket.qrString" [width]="256" [errorCorrectionLevel]="'M'"></qrcode>
			-->
			<p class="text-2xl font-bold">{{ ticket?.lastName?.toUpperCase() }}, {{ ticket?.firstName }}</p>
			<p class="text-2xl font-bold">{{ ticket?.dni }}</p>
			
		</div>

	</div>
  }
  `,
	styleUrl: './ticket-view.component.scss'
})
export class TicketViewComponent {
	private route = inject(ActivatedRoute)
	private ticketService = inject(TicketService)
	private eventService = inject(EventService);
	
	ticket$ = this.route.params.pipe(
		takeUntilDestroyed(),
		switchMap(({ uuid }) => this.ticketService.getTicketByUUID(uuid)),
		map((ticket) => ({ ...ticket, qrUrl: this.ticketService.generateTicketQRURL(ticket) })),
	);

	selectedEvent$ = this.eventService.selectedEvent$
}
