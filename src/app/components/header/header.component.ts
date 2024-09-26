import { Component, inject, input, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';
import { User } from '../../interfaces/user.interface';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'ticketera-header',
	standalone: true,
	imports: [CommonModule, LogoutButtonComponent, RouterModule],
	template: `
		<a [routerLink]="['']" >
			<header class="bg-primary-dark">
				<div class="mx-5 max-w-screen-lg px-4 py-4 sm:px-6 sm:py-8 md:max-w-screen-lg lg:px-8">
					<h1 class="text-2xl font-bold text-white">TICKETERA RESET</h1>
				</div>
			</header>
		</a>
		<div class="bg-primary text-white">
			<div
				class="mx-5 grid max-w-screen-lg grid-cols-2 content-center px-4 py-2 sm:px-6 sm:py-4 md:max-w-screen-lg lg:px-8"
			>
				@if (user()) {
					<div class="content-center text-xl">Hola, {{ user().firstName }}!</div>
				}
				<div class="flex justify-end">
					@if (isPlatformBrowser) {
						<ticketera-logout-button />
					}
				</div>
			</div>
		</div>
	`,
	styles: ``,
})
export class HeaderComponent {
	user = input.required<User>();
	isPlatformBrowser = isPlatformBrowser(inject(PLATFORM_ID));
}
