import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterOrders'
})
export class FilterOrdersPipe implements PipeTransform {

  transform(OrderedList: any[], searchItem: string): any[] {
    if (!OrderedList) return [];
    if (!searchItem) return OrderedList;

    const value = searchItem.toLowerCase();

    return OrderedList.filter(order =>
      order?.phoneNumber?.toLowerCase().includes(value) ||
      order?.name?.toLowerCase().includes(value)
    );
  }
}

