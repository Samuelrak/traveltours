import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider/slider';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

 sliderValue: number = 0; 
 
  onSliderChange(event: MatSliderChange) {
    this.sliderValue = event.value!;
  }

  constructor() { }
  title = 'travel tours';
  ngOnInit(): void {
  }
  

}
