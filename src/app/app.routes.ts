import { Routes } from '@angular/router';
import { LetterToSantaComponent } from './features/letter-to-santa/letter-to-santa.component';

export const routes: Routes = [
  { path: '', redirectTo: '/letter', pathMatch: 'full' },
  { path: 'letter', component: LetterToSantaComponent },
  { path: '**', redirectTo: '/letter' },
];
