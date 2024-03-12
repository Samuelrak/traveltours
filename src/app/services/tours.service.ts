import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Tour } from '../entities/tours';

@Injectable({
  providedIn: 'root',
})
export class ToursService {
  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  getTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(`${this.apiUrl}/view`).pipe(
      catchError(this.handleError)
    );
  }

  addTour(formData: FormData): Observable<Tour[]> {
    return this.http.post<Tour[]>(`${this.apiUrl}/add`, formData).pipe(
      catchError(this.handleError)
    );
  }

  deleteTour(tourId: number): Observable<Tour[]> {
    return this.http.delete<Tour[]>(`${this.apiUrl}/delete/${tourId}`).pipe(
      catchError(this.handleError)
    );
  }

  updateTour(tourId: number, updatedTour: Tour | FormData): Observable<Tour[]> {
    return this.http.put<Tour[]>(`${this.apiUrl}/put/${tourId}`, updatedTour).pipe(
      catchError(this.handleError)
    );
  }

  getTour(tourId: number): Observable<Tour> {
    return this.http.get<Tour>(`${this.apiUrl}/view/${tourId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Server is not responding. Try again';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
