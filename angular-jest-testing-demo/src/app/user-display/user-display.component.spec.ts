import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDisplayComponent } from './user-display.component';
import { By } from '@angular/platform-browser';
import { UserService } from './user.service';
import { of } from 'rxjs';

describe('UserDisplayComponent with Mock', () => {
  let component: UserDisplayComponent;
  let fixture: ComponentFixture<UserDisplayComponent>;

  const mockUserService = {
    getUser: jest.fn().mockReturnValue(of({ name: 'Mock User' })),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDisplayComponent],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the mocked user name', () => {
    const p = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(p.textContent).toContain('Mock User');
  });

  it('should call getUser from UserService', () => {
    expect(mockUserService.getUser).toHaveBeenCalled();
  });
});
