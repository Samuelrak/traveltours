import { Component, OnInit } from '@angular/core';
import { ToursService } from '../tours.service';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css'],
})
export class ToursComponent implements OnInit {
  tours: any[] = [];

  constructor(private toursService: ToursService) {}

  ngOnInit(): void {
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

  private formatDates(tours: any[]): any[] {
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

  deleteTour(tourId: number): void {
    if (confirm('Are you sure you want to delete this tour?')) {
      this.toursService.deleteTour(tourId).subscribe(
        (response) => {
          console.log('Tour deleted successfully:', response);
          // Refresh the list of tours after deletion
          this.fetchTours();
        },
        (error) => {
          console.error('Error deleting tour:', error);
        }
      );
    }
  }
}
