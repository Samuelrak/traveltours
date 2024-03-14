import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function dateRangeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startDate = control.value.start_date;
    const endDate = control.value.end_date;

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return { dateRange: true };
    }

    return null;
  };
}

export function priceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const price = control.value;

    if (price && price <= 0) {
      return { priceRange: true };
    }

    return null;
  };
}

export function peopleValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const people = control.value;

    if (people && people <= 6) {
      return { peopleMinRange: true };
    }
    if (people && people >= 15) {
      return { peopleMaxRange: true };
    }
    return null;
  };
}
export function startDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startDate = control.value;
    console.log('start date is:' + startDate);

    const currentDate = new Date();
    console.log('current date is:' + currentDate);

    const selectedDate = new Date(startDate);

    if (selectedDate && selectedDate <= currentDate) {
      console.log('val executed');

      return { startRange: true };
    }
    return null;
  };
}
