import { AfterViewInit, Component, inject, input } from '@angular/core';
import { BreadcrumbItem } from '../../pages/layouts/breadcrumb';
import { Common } from '../../services/common';

@Component({
  selector: 'app-blank',
  imports: [],
  template:`
    <title>e-Ticaret Admin | {{pageTitle()}}</title>
  `
 
})
export class Blank implements AfterViewInit{

  readonly pageTitle= input.required<string>();
   breadcrumbs= input.required<BreadcrumbItem[]>();

   readonly #common= inject(Common);

    ngAfterViewInit(): void {
      this.#common.set(this.breadcrumbs());
    }
}
