import { Routes } from '@angular/router';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', redirectTo: '/#about', pathMatch: 'full' },
  { path: 'technology', redirectTo: '/#technology', pathMatch: 'full' },
  { path: 'contact', redirectTo: '/#contact', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];
