import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tours-add',
  templateUrl: './tours-add.component.html',
  styleUrls: ['./tours-add.component.css'],
})
export class ToursAddComponent implements OnInit {
  tourForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    location: ['', Validators.required],
    continent: ['', Validators.required],
    start_date: ['', Validators.required],
    end_date: ['', Validators.required],
    people: ['', Validators.required],
    price: ['', Validators.required],
    photo: [''],
  });

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    // No need for initialization here anymore
  }

  onSubmit() {
    if (this.tourForm.valid) {
      const formData = new FormData();
      formData.append('name', this.tourForm.get('name')?.value);
      formData.append('location', this.tourForm.get('location')?.value);
      formData.append('continent', this.tourForm.get('continent')?.value);
      formData.append('start_date', this.tourForm.get('start_date')?.value);
      formData.append('end_date', this.tourForm.get('end_date')?.value);
      formData.append('people', this.tourForm.get('people')?.value);
      formData.append('price', this.tourForm.get('price')?.value);
      formData.append('photo', this.tourForm.get('photo')?.value);

      this.http.post('http://localhost:5000/add', formData).subscribe(
        (response) => {
          console.log('Response from server:', response);
          // TODO: Handle te response from server
        },
        (error) => {
          console.error('Error:', error);
          // TODO: Handle errors if there are any
        }
      );
    }
  }
}
