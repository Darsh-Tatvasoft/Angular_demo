import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MathDisplayComponent } from './math-display.component';
import { MathService } from './math.service';
import { By } from '@angular/platform-browser';

describe('MathDisplayComponent', () => {
  let component: MathDisplayComponent;
  let fixture: ComponentFixture<MathDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MathDisplayComponent],
      providers: [MathService],
    }).compileComponents();

    fixture = TestBed.createComponent(MathDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate and display results when button is clicked', () => {
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');
    fixture.detectChanges();

    const paragraphs = fixture.debugElement.queryAll(By.css('p'));
    expect(paragraphs[0].nativeElement.textContent).toContain('Add Result: 8');
    expect(paragraphs[1].nativeElement.textContent).toContain(
      'Subtract Result: 2'
    );
  });
});
