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

  showMessage: boolean = false;
  isError: boolean = false;
  isSuccess: boolean = false;
  message: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {}

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

          // Show success message
          this.showMessage = true;
          this.isSuccess = true;
          this.isError = false;
          this.message = 'Tour added successfully!';

          // Hide the message after 2 seconds
          setTimeout(() => {
            this.hideMessage();
          }, 2000);

          this.resetForm();
        },
        (error) => {
          console.error('Error:', error);

          // Check if there's a specific error message from the server
          const errorMessage =
            error.error && error.error.message
              ? error.error.message
              : 'Failed to add tour. Please try again.';

          // Show error message
          this.showMessage = true;
          this.isSuccess = false;
          this.isError = true;
          this.message = errorMessage;

          // Hide the message after 2 seconds
          setTimeout(() => {
            this.hideMessage();
          }, 2000);
        }
      );
    }
  }

  private hideMessage(): void {
    this.showMessage = false;
    this.isSuccess = false;
    this.isError = false;
    this.message = '';
  }

  private resetForm() {
    this.tourForm.reset();
  }
}
