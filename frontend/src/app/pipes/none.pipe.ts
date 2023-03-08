import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'none'
})
export class NonePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): string {
    if( Array.isArray(value)){
      return value.length ? value.join(',') : '[ ]';
    }

    return  value ? value : '-';
  }

}
