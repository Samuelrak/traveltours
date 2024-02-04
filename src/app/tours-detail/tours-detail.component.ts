import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ToursService } from '../services/tours.service'; 
import { Tour } from '../entities/tours';


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

}
