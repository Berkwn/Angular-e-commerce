import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Common } from '../../services/common';


export interface BreadcrumbItem {
  title: string;
  icon: string;
  url?: string;
}

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  template:`
   <ol class="breadcrumb">
    @for (val of data(); track val.url) {
 <li class="breadcrumb-item">
    <a [routerLink]="val.url" class="d-flex align-items-center">
       <span class="material-symbols-outlined">{{val.icon}}</span>
        <span>{{val.title}}</span>
      </a>
  </li>
    }
  
  
  </ol>`
})
export default class Breadcrumb {

  
  readonly #common = inject(Common);
  readonly data =computed(() => this.#common.data());
  
}
