import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToursAddComponent } from './tours-add.component';

describe('ToursAddComponent', () => {
  let component: ToursAddComponent;
  let fixture: ComponentFixture<ToursAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToursAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToursAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
