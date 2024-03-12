import { Component, OnInit } from '@angular/core';
import { ToursService } from '../services/tours.service';
import { Tour } from '../entities/tours';
import { format } from 'date-fns';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css'],
})
export class ToursComponent implements OnInit {
  tours: Tour[] = [];
  isAdmin = false;
  editedTour: Tour | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private router: Router,
    private toursService: ToursService,
    private authService: AuthService,
    public messageService: MessageService
  ) {}

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
        this.messageService.setErrorMessageTours('Failed to fetch tours. Please try again later.');
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
    return format(date, 'yyyy-MM-dd');
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
          this.messageService.setSuccessMessageTours('Tour deleted successfully!');
        },
        (error) => {
          console.error('Error deleting tour:', error);
          this.messageService.setErrorMessageTours('Failed to delete tour. Please try again later.');
        }
      );
    }
  }

  editTour(tour: Tour): void {
    this.editedTour = { ...tour };
  }

  saveTour() {
    console.log('Saving tour:', this.editedTour);

    const formData = new FormData();
    if (this.editedTour) {
      for (const [key, value] of Object.entries(this.editedTour)) {
        if (value !== null && value !== undefined) {
          if (key.includes('_date') && value instanceof Date) {
            const formattedDate = format(value, 'yyyy-MM-dd');
            formData.append(key, formattedDate);
          } else if (key === 'photo' && value instanceof File) {
            formData.append('photo', value);
          } else if (typeof value === 'object' && !(value instanceof File)) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value.toString());
          }
        }
      }
    }
    console.log('Data being sent to the backend:', formData);

    this.toursService.updateTour(this.editedTour?.id || 0, formData).subscribe(
      (response) => {
        console.log('Tour updated successfully:', response);
        this.fetchTours();
        this.cancelEdit();
        this.messageService.setSuccessMessageTours('Tour updated successfully!');
      },
      (error) => {
        console.error('Error updating tour:', error);
        this.messageService.setErrorMessageTours('Failed to update tour. Please try again later.');
      }
    );
  }

  cancelEdit(): void {
    this.editedTour = null;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (this.editedTour) {
      this.editedTour.photo = file;
    }
  }

  navigateToDetail(tourId: number): void {
    this.router.navigate(['/tour-detail', tourId]);
  }
}
