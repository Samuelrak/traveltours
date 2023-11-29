import { Component, OnInit } from '@angular/core';
import { ToursService } from '../tours.service';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css'],
})
export class ToursComponent implements OnInit {
  tours: any[] | undefined;

  constructor(private toursService: ToursService) {}

  ngOnInit() {
    this.toursService.getTours().subscribe(data => {
      this.tours = data;
    });
  }
}