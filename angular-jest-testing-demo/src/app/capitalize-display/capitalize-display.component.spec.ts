import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapitalizeDisplayComponent } from './capitalize-display.component';
import { By } from '@angular/platform-browser';
import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizeDisplayComponent', () => {
  let component: CapitalizeDisplayComponent;
  let fixture: ComponentFixture<CapitalizeDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapitalizeDisplayComponent, CapitalizePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(CapitalizeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should capitalize the text in the template', () => {
    const p = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(p.textContent).toBe('Angular jest testing');
  });
});
