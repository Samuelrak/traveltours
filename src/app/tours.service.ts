import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToursService {
  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  getTours(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/view`);
  }

  deleteTour(tourId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${tourId}`);
  }
}
