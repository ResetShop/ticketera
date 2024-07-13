import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TicketService } from 'src/app/providers/ticket.service';
import { Ticket } from 'src/app/interfaces/ticket.model';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { first } from 'rxjs'
import { UserService } from '../../providers/user.service'
import { AuthenticationService } from '../../providers/authentication.service'

@Component({
	selector: 'ticketera-ticket-add',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	providers: [TicketService],
	template: `
		<div class="m-5 grid rounded bg-white p-5 drop-shadow">
			<p class="text-xl font-bold">Nueva Entrada</p>

			<form [formGroup]="ticketForm" (ngSubmit)="onSubmit()" class="w-full max-w-lg mx-auto mt-5">
				<div class="-mx-3 mb-3 flex flex-wrap">
					<div class="mb-6 w-full px-3 md:mb-0 md:w-1/2">
						<label class="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700" for="grid-first-name">
							Nombre
						</label>
						<input
							class="border border-red-500 mb-3 block w-full appearance-none rounded bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
							id="grid-first-name"
							type="text"
							formControlName="firstName"
							placeholder="Carlos"
						/>
						<div *ngIf="ticketForm.controls['firstName'].invalid && ticketForm.controls['firstName'].touched">
							<span class="text-red text-xs italic">❌ Ingrese un nombre</span>
						</div>
					</div>
					<div class="w-full px-3 md:w-1/2">
						<label class="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700" for="grid-last-name">
							Apellido
						</label>
						<input
							class="border block w-full appearance-none rounded border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
							id="grid-last-name"
							type="text"
							formControlName="lastName"
							placeholder="Perez"
						/>
						<div *ngIf="ticketForm.controls['lastName'].invalid && ticketForm.controls['lastName'].touched">
							<span class="text-red-500 text-xs italic">❌ Ingrese un apellido</span>
						</div>
					</div>
				</div>
				<div class="-mx-3 mb-3 flex flex-wrap">
					<div class="w-full px-3">
						<label class="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700" for="grid-id">
							DNI
						</label>
						<input
							class="border mb-3 block w-full appearance-none rounded border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
							id="grid-id"
							type="text"
							formControlName="dni"
							placeholder="12345678"
						/>
						<p class="text-xs italic text-gray-600">Sin puntos ni guiones</p>
						<div *ngIf="ticketForm.controls['dni'].invalid && ticketForm.controls['dni'].touched">
							<span class="text-red-500 text-xs italic">❌ Ingrese un DNI (solo números)</span>
						</div>
					</div>
				</div>
				<div class="-mx-3 mb-3 flex flex-wrap">
					<div class="w-full px-3">
						<label class="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700" for="grid-phone">
							Teléfono
						</label>
						<input
							class="border mb-3 block w-full appearance-none rounded border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
							id="grid-phone"
							type="text"
							formControlName="phone"
							placeholder="3404516946"
						/>
						<p class="text-xs italic text-gray-600">Sin 0 ni 15, sin espacios</p>
						<div *ngIf="ticketForm.controls['phone'].invalid && ticketForm.controls['phone'].touched">
							<span class="text-red-500 text-xs italic">❌ Ingrese un teléfono (solo numeros)</span>
						</div>
					</div>
				</div>
			</form>

			<button
				[disabled]="ticketForm.invalid || isLoading"
				(click)="onSubmit()"
				class="mt-5 flex w-full justify-center rounded bg-success px-4 py-2 font-bold text-white drop-shadow hover:bg-success-dark"
				type="submit"
			>
				<img class="mr-1 h-5" src="/assets/img/icons/add.svg" alt="" />
				<span>GENERAR ENTRADA</span>
			</button>
		</div>
	`,
	styleUrl: './ticket-add.component.scss',
})
export class TicketAddComponent implements OnInit {
	ticketForm!: FormGroup;
	isLoading: boolean = false;

	private formBuilder = inject(FormBuilder);
	private router = inject(Router);
	private ticketService = inject(TicketService);
	private authenticationService = inject(AuthenticationService);

	ngOnInit(): void {
		this.ticketForm = this.formBuilder.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			dni: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
			phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
		})
	}

	onSubmit() {
		this.isLoading = true;
		if (this.ticketForm?.valid) {

			const user = this.authenticationService.currentUser$.value ?? null;

			console.log(user);

			if(!user){
				console.error('Usuario no encontrado');
				return;
			}

			const tk: Ticket = {
				firstName: this.ticketForm.value.firstName,
				lastName: this.ticketForm.value.lastName,
				dni: this.ticketForm.value.dni,
				phone: this.ticketForm.value.phone,
				cost: 1800,
				createdBy: user.id,
				id: 0,
				qrString: '',
				email: '',
				createdAt: '',
				updatedAt: '',
				enabled: false,
				deleted: false
			}

			this.ticketService.createTicket(tk).pipe(first()).subscribe({
				next: (response) => {
					this.isLoading = false;
					const createdTicketID = response.id;
					this.router.navigate([`/ticket-detail/${createdTicketID}`]);
				},
				error: (error) => {
					this.isLoading = false;
					console.error('Error al crear el ticket', error);
				}
			})

		}
	}
}
