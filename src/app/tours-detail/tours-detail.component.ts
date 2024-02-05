import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ToursService } from '../services/tours.service'; 
import { Tour } from '../entities/tours';
import { format } from 'date-fns';

@Component({
  selector: 'app-tours-detail',
  templateUrl: './tours-detail.component.html',
  styleUrls: ['./tours-detail.component.css']
})
export class ToursDetailComponent implements OnInit {
  tourId!: number; 
  tour: Tour | null = null; 

  constructor(
    private route: ActivatedRoute,
    private toursService: ToursService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log('Tour ID:', params['id']);
      this.tourId = +params['id'];
      if (!isNaN(this.tourId)) {
        this.fetchTourDetails();
      } else {
        console.error('Invalid tourId:', params['id']);
      }
    });
  }

  fetchTourDetails() {
    this.toursService.getTour(this.tourId).subscribe(
      (tour: Tour) => {
        this.tour = tour;
      },
      (error) => {
        console.error('Error fetching tour details:', error);
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
    const formattedDate = format(date, 'yyyy-MM-dd');
    return formattedDate;
  }

  getPhotoUrl(base64Data: string): string {
    if (base64Data) {
      return 'data:image/jpeg;base64,' + base64Data;
    } else {
      return 'path/to/default/photo.jpg';
    }
  }

}
