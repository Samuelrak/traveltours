import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToursService } from '../services/tours.service';
import {
  dateRangeValidator,
  priceValidator,
  peopleValidator,
} from '../custom-validators/tour-edit-validators';

@Component({
  selector: 'app-tours-add',
  templateUrl: './tours-add.component.html',
  styleUrls: ['./tours-add.component.css'],
})
export class ToursAddComponent implements OnInit {
  tourForm: FormGroup = this.fb.group(
    {
      name: ['', Validators.required],
      location: ['', Validators.required],
      continent: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      people: ['', [Validators.required, peopleValidator()]],
      price: ['', [Validators.required, priceValidator()]],
      photo: [null, Validators.required],
    },
    { validator: dateRangeValidator() }
  );

  showMessage: boolean = false;
  isError: boolean = false;
  isSuccess: boolean = false;
  message: string = '';
  continents: string[] = [
    'Africa',
    'Asia',
    'Europe',
    'North America',
    'South America',
    'Australia',
    'Antarctica',
  ];

  constructor(private fb: FormBuilder, private toursService: ToursService) {}

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

      this.toursService.addTour(formData).subscribe(
        (newTour) => {
          console.log('New tour added:', newTour);

          this.showMessage = true;
          this.isSuccess = true;
          this.isError = false;
          this.message = 'Tour added successfully!';

          setTimeout(() => {
            this.hideMessage();
          }, 2000);

          this.resetForm();
        },
        (error) => {
          console.error('Error:', error);

          const errorMessage =
            error.error && error.error.message
              ? error.error.message
              : 'Failed to add tour. Please try again.';

          this.showMessage = true;
          this.isSuccess = false;
          this.isError = true;
          this.message = errorMessage;

          setTimeout(() => {
            this.hideMessage();
          }, 2000);
        }
      );
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.tourForm.patchValue({
      photo: file,
    });
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
