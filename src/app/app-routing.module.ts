import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoctailsListComponent } from './coctails-list/coctails-list.component';
import { CoctailDetailsComponent } from './coctail-details/coctail-details.component';

const routes: Routes = [
  {
    path: '',
    component: CoctailsListComponent
  },
  {
    path: 'coctails/:name',
    component: CoctailDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
