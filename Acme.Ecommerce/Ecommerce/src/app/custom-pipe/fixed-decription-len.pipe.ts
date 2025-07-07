import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fixedDecriptionLen',
  standalone: true
})
export class FixedDecriptionLenPipe implements PipeTransform {

  transform(value: string, limit: number = 20): string {
    if (!value) return '';
    const words = value.split(' ');
    if (words.length <= limit) return value;
    return words.slice(0, limit).join(' ') + '...';
  }

}
