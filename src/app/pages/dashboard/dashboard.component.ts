import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { RouterLink } from '@angular/router'
import { ROUTE_TREE } from '../../app.routes'
import { switchMap } from 'rxjs';

// Services
import { EventService } from '../../providers/event.service';
import { TicketService } from '../../providers/ticket.service'

@Component({
	selector: 'ticketera-dashboard',
	standalone: true,
	imports: [ CommonModule, RouterLink ],
	template: `
		<a [routerLink]="['..', appRoute.TICKET_REDEEM]">
			<button
				class="bg-success hover:bg-success-dark mx-auto rounded-full px-4 py-2 font-bold text-white shadow-lg flex"
			>CANJEAR ENTRADAS</button>
		</a>
		@if(tickets$ | async; as tickets){
		<div class="m-5 grid rounded bg-white p-5 text-center drop-shadow">
			<span class="text-5xl font-bold text-success">{{ tickets.length }}</span>
			<span class="text-m font-bold">ENTRADAS VENDIDAS</span>
		</div>

		<div class="overflow-x-auto">
			<table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
				<thead class="ltr:text-left rtl:text-right">
					<tr>
						<th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">#</th>
						<th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Nombre</th>
						<th class="px-4 py-2"></th>
					</tr>
				</thead>

				<tbody class="divide-y divide-gray-200">
				

					<tr *ngFor="let ticket of tickets">
						<td class="whitespace-nowrap px-4 py-5 font-medium text-gray-900">#{{ ticket.id }}</td>
						<td class="whitespace-nowrap px-4 py-5 text-gray-700">{{ ticket.lastName }}, {{ ticket.firstName }}</td>
						<td class="flex justify-between whitespace-nowrap px-4 py-5 min-w-[100px]">
							<a [routerLink]="['..', appRoute.TICKET_DETAIL, ticket.id]"><img class="h-5" src="/assets/img/icons/qr-code.svg" alt=""/></a>
							<a [routerLink]="['..', appRoute.TICKET_VIEW, ticket.qrString]"><img class="h-5" src="/assets/img/icons/ticket.svg" alt=""/></a>
							<img class="h-5" src="/assets/img/icons/whatsapp.svg" alt="" />
						</td>
					</tr>

				</tbody>
			</table>
		</div>
		}
		<a [routerLink]="['..', appRoute.TICKET_ADD]">
			<button
				class="bg-success hover:bg-success-dark fixed bottom-4 right-4 rounded-full px-4 py-2 font-bold text-white shadow-lg flex"
			><img class="h-5 mr-1" src="/assets/img/icons/add.svg" alt="" /> GENERAR ENTRADA</button>
		</a>
	`,
	styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

	appRoute = ROUTE_TREE;

	private eventService = inject(EventService);
	private ticketService = inject(TicketService);
	tickets$ = this.eventService.selectedEvent$.asObservable().pipe(
		switchMap((event) => this.ticketService.getAllTickets(event!.id)),
		takeUntilDestroyed());
}
