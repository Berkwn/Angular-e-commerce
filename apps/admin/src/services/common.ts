import { Injectable, signal, Signal } from '@angular/core';
import { BreadcrumbItem } from '../pages/layouts/breadcrumb';

@Injectable({
  providedIn: 'root',
})
export class Common {
   readonly data=signal<BreadcrumbItem[]>([]);
   set(data:BreadcrumbItem[]){
   const val:BreadcrumbItem={ title: 'Ana Sayfa', icon: 'home', url: '/' };
 

   this.data.set([val,...data]);
 
  }
 }



