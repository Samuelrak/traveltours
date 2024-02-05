import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToursService } from '../services/tours.service';
import { MessageService } from '../services/message.service';

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
    photo: [null, Validators.required]
  });

  showMessage: boolean = false;
  isError: boolean = false;
  isSuccess: boolean = false;
  message: string = '';
  continents: string[] = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Australia', 'Antarctica'];

  constructor(
    private fb: FormBuilder,
    private toursService: ToursService,
    private messageService: MessageService 

  ) {}

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
          this.messageService.setSuccessMessageTours('Tour added successfully!'); 
          this.resetForm();
        },
        (error) => {
          this.messageService.setErrorMessageTours('Failed to add tour. Please try again.');
        }
      );
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.tourForm.patchValue({
      photo: file
    });
  }

  private resetForm() {
    this.tourForm.reset();
  }
}
