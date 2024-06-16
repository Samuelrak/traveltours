import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToursService } from '../services/tours.service';
import { MessageService } from '../services/message.service';
import { ContinentService } from '../services/continent.service';
import {
  dateRangeValidator,
  priceValidator,
  peopleValidator,
  startDateValidator,
  photoValidation
} from '../custom-validators/tour-edit-validators';

@Component({
  selector: 'app-tours-add',
  templateUrl: './tours-add.component.html',
  styleUrls: ['./tours-add.component.css'],
})
export class ToursAddComponent implements OnInit {
  showMessage: boolean = false;
  isError: boolean = false;
  isSuccess: boolean = false;
  message: string = '';
  
  //Continents are now declared in continent.service.ts
  // continents: string[] = [
  //   'Africa',
  //   'Asia',
  //   'Europe',
  //   'North America',
  //   'South America',
  //   'Australia',
  //   'Antarctica',
  // ];

  constructor(
    private fb: FormBuilder,
    private toursService: ToursService,
    private messageService: MessageService,
    private continentService: ContinentService
  ) {}

  tourForm: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required, Validators.maxLength(15)]],
      location: ['', [Validators.required, Validators.maxLength(20)]],
      continent: ['', Validators.required],
      start_date: ['', [Validators.required, startDateValidator()]],
      end_date: ['', Validators.required],
      people: ['', [Validators.required, peopleValidator()]],
      price: ['', [Validators.required, priceValidator()]],
      photo: [null, Validators.required,],
    },
    { validator: dateRangeValidator() }
  );

 

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
          this.messageService.setSuccessMessageTours(
            'Tour added successfully!'
          );
          this.resetForm();
        },
        (error) => {
          this.messageService.setErrorMessageTours(
            'Failed to add tour. Please try again.'
          );
        }
      );
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    
    if (!file) {
      return;
    }
  
    const allowedTypes = ['image/jpeg', 'image/png'];

    if (!allowedTypes.includes(file.type)) {
      this.tourForm.get('photo')?.setErrors({ fileType: true });
      return;
    }

    const photoSize = file.size /1024;
  
    const photoControl = this.tourForm.get('photo') as FormControl; 
    const validator = photoValidation(photoSize);
    photoControl.setValidators(validator); 
    photoControl.updateValueAndValidity(); 
  
    this.tourForm.patchValue({
      photo: file,
    });
  }
  

  private resetForm() {
    this.tourForm.reset();
  }

  get continents(): string[]{
    return this.continentService.continents;
  }
}
