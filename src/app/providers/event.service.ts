import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable, tap } from 'rxjs'
import { Event } from '../interfaces/event.model'
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private readonly prefix = `${environment.redirectUri}api/event`;

  selectedEvent$ = new BehaviorSubject<Event | null>(null);

  http = inject(HttpClient);

  getById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.prefix}/${id}`);
  }

  // Asigna un evento por defecto para la aplicación
  // TODO: Eliminar al implementar la selección de evento
  loadDefault(): Observable<Event> {
    return this.getById(environment.selectedEventId).pipe(
        tap(event => this.selectedEvent$.next(event)),
    )
  }
}
