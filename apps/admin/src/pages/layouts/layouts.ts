import { Component, computed, signal } from '@angular/core';
import Breadcrumb from './breadcrumb';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { navigations } from '../../navigation';
import { NavPipe } from '../../pipes/nav-pipe';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import Home from '../home/home';

@Component({
  selector: 'app-layouts',
  imports: [Breadcrumb,RouterLink,RouterLinkActive,NavPipe,
    FormsModule,
    RouterOutlet,
    DatePipe
  ],
  templateUrl: './layouts.html',
  styleUrl: './layouts.css',
})
export default class Layouts {

  readonly time =signal<Date>(new Date());
  readonly search= signal<string>('');
  readonly navigations= computed(() => navigations);

 constructor(){
    setInterval(() => {
      this.time.set(new Date());
    }, 1000);
 }
}
