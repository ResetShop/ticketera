import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { authorizedGuard } from './guards/authorized.guard';
import { appResolver } from './app.resolver'

export const ROUTE_TREE = {
	DASHBOARD: 'dashboard',
	TICKET_ADD: 'ticket-add',
	TICKET_DETAIL: 'ticket-detail',
	UNAUTHORIZED: 'unauthorized',
	TICKET_VIEW: 'ticket-view',
	TICKET_REDEEM: 'ticket-redeem'
};

export const appRoutes: Routes = [
	{
		path: `${ROUTE_TREE.TICKET_VIEW}/:uuid`,
		loadComponent: () =>
			import('./pages/ticket-view/ticket-view.component').then((m) => m.TicketViewComponent),
	},
	{
		path: '',
		resolve: { event: appResolver },
		children: [
			{
				path: ROUTE_TREE.DASHBOARD,
				loadComponent: () => import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
			},
			{
				path: ROUTE_TREE.TICKET_ADD,
				loadComponent: () => import('./pages/ticket-add/ticket-add.component').then((m) => m.TicketAddComponent),
			},
			{
				path: `${ROUTE_TREE.TICKET_DETAIL}/:id`,
				loadComponent: () =>
					import('./pages/ticket-detail/ticket-detail.component').then((m) => m.TicketDetailComponent),
			},
			{
				path: ROUTE_TREE.TICKET_REDEEM,
				loadComponent: () => import('./pages/ticket-redeem/ticket-redeem.component').then((m) => m.TicketRedeemComponent),
			},
			{
				path: '',
				redirectTo: ROUTE_TREE.DASHBOARD,
				pathMatch: 'full',
			},
		],
		canActivate: [authGuard, authorizedGuard],
	},
	{
		path: ROUTE_TREE.UNAUTHORIZED,
		loadComponent: () => import('./pages/unauthorized/unauthorized.component').then((m) => m.UnauthorizedComponent),
		pathMatch: 'full',

	},
	{
		path: '**',
		redirectTo: ROUTE_TREE.DASHBOARD,
		pathMatch: 'full',
	},
];
