import { TestBed } from '@angular/core/testing';
import { MathService } from './math.service';

describe('MathService', () => {
  let service: MathService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MathService],
    });
    service = TestBed.inject(MathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add two numbers correctly', () => {
    expect(service.add(2, 3)).toBe(5);
  });

  it('should subtract two numbers correctly', () => {
    expect(service.subtract(5, 3)).toBe(2);
  });
});
