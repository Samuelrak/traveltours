import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tour } from '../entities/tours';

@Injectable({
  providedIn: 'root',
})
export class ToursService {
  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  getTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(`${this.apiUrl}/view`);
  }

  addTour(formData: FormData): Observable<Tour[]> {
    return this.http.post<Tour[]>(`${this.apiUrl}/add`, formData);
  }

  deleteTour(tourId: number): Observable<Tour[]> {
    return this.http.delete<Tour[]>(`${this.apiUrl}/delete/${tourId}`);
  }

}
