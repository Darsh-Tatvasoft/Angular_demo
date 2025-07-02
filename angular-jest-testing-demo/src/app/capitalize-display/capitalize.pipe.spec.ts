import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  let pipe: CapitalizePipe;

  beforeEach(() => {
    pipe = new CapitalizePipe();
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should capitalize the first letter of a string', () => {
    const result = pipe.transform('angular jest testing');
    expect(result).toBe('Angular jest testing');
  });

  it('should handle strings with leading and trailing whitespace', () => {
    const result = pipe.transform('  angular jest testing  ');
    expect(result).toBe('Angular jest testing');
  });

  it('should return an empty string for null or undefined input', () => {
    expect(pipe.transform(null as any)).toBe('');
    expect(pipe.transform(undefined as any)).toBe('');
  });

  it('should handle empty strings and whitespace-only strings', () => {
    expect(pipe.transform('')).toBe('');
    expect(pipe.transform('   ')).toBe('');
  });
});
