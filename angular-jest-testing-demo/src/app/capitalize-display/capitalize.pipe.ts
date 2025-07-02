import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    if (value == null || value == '' || value.trim() == '' || value == undefined) return '';
    value = value.trim();
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
