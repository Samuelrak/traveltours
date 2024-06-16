import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContinentService {
  continents: string[] = [
    'Africa',
    'Asia',
    'Europe',
    'North America',
    'South America',
    'Australia',
    'Antarctica',
  ];

  constructor() { }
}
