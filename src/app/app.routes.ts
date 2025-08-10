import { Routes } from '@angular/router';
import { ApiDataComponent } from './pages/api-data/api-data.component';
import { FormComponent } from './pages/form/form.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'api', component: ApiDataComponent },
  { path: 'form', component: FormComponent },
  { path: '**', redirectTo: '' } 
];
