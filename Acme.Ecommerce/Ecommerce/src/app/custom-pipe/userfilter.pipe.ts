import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userfilter'
})
export class UserfilterPipe implements PipeTransform {

  transform(users: any[], searchItem: string): any[] {
    const value=searchItem.toLocaleLowerCase();
    return users.filter(user =>
      user.firstName.toLocaleLowerCase().includes(value) ||
      user.lastName.toLocaleLowerCase().includes(value) ||
      user.email.toLocaleLowerCase().includes(value)
    );
  }

}
