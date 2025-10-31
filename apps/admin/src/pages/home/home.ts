import { Component, inject, signal } from '@angular/core';
import { Blank } from '../../components/blank/blank';
import { Common } from '../../services/common';
import { BreadcrumbItem } from '../layouts/breadcrumb';

@Component({
  selector: 'app-home',
  imports: [Blank],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export default class Home {

  readonly common =inject(Common);
  readonly breadCrumb=signal<BreadcrumbItem[]>([
    { title: 'Ana Sayfa', icon: 'home', url: '/' }
  ]);
  // constructor(){
  //   this.common.set('Ana Sayfa','home','/');
  // }
}
