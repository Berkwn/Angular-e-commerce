import { Pipe, PipeTransform } from '@angular/core';
import { NavigationModel } from '../navigation';

@Pipe({
  name: 'nav'
})
export class NavPipe implements PipeTransform {

  transform(value: NavigationModel[], search: string): NavigationModel[] | null {


    return value.filter(nav => nav.title.toLowerCase().includes(search.toLowerCase()));
  }

}
