import { Component, OnInit } from '@angular/core';
import { ToursService } from '../services/tours.service';
import { Tour } from '../entities/tours';
import { AuthService } from '../services/auth-service.service';
import { User } from '../entities/user';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css'],
})
export class ToursComponent implements OnInit {

  tours: Tour[] = [];
  isAdmin = false;

  constructor(private toursService: ToursService, private authService: AuthService ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.getIsAdmin();
    this.fetchTours();
  }

  private fetchTours(): void {
    this.toursService.getTours().subscribe(
      (data) => {
        this.tours = this.formatDates(data);
      },
      (error) => {
        console.error('Error fetching tours:', error);
      }
    );
  }

  private formatDates(tours: Tour[]): Tour[] {
    return tours.map((tour) => {
      return {
        ...tour,
        start_date: this.formatDate(tour.start_date),
        end_date: this.formatDate(tour.end_date),
      };
    });
  }

  private formatDate(dateString: string): string {
    if (!dateString || dateString === '0000-00-00') {
      return '';
    }

    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  getPhotoUrl(base64Data: string): string {
    if (base64Data) {
      return 'data:image/jpeg;base64,' + base64Data;
    } else {
      return 'path/to/default/photo.jpg';
    }
  }

  deleteTour(tourId: number): void {
    if (confirm('Are you sure you want to delete this tour?')) {
      this.toursService.deleteTour(tourId).subscribe(
        (response) => {
          console.log('Tour deleted successfully:', response);
          this.fetchTours();
        },
        (error) => {
          console.error('Error deleting tour:', error);
        }
      );
    }
  }
}
