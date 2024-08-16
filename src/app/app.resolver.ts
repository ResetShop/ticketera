import { ResolveFn } from '@angular/router';
import { EventService } from './providers/event.service'
import { inject } from '@angular/core'
import { Event } from './interfaces/event.model'

// Resolver que se encarga de asignar un evento seleccionado por
// defecto para el cliente durante toda la corrida de la aplicación
// RO - 2024-08-08 --- TODO: Eliminar al implementar la selección de evento
export const appResolver: ResolveFn<Event> = (route, state) => {
  return inject(EventService).loadDefault();
};
