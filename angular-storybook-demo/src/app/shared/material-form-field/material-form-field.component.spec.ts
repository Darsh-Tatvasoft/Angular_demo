import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialFormFieldComponent } from './material-form-field.component';

describe('MaterialFormFieldComponent', () => {
  let component: MaterialFormFieldComponent;
  let fixture: ComponentFixture<MaterialFormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialFormFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
