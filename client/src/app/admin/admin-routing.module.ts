import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  // {
  //   path: '', component: null
  // },
  // {
  //   path: 'genres', component: null
  // },
  // {
  //   path: 'genres/:id', component: null
  // },
  // {
  //   path: 'genres/:id/photos', component: null
  // },
  // {
  //   path: 'photos', component: null
  // },
  // {
  //   path: 'photos/:id', component: null
  // },
  // {
  //   path: '**', component: null
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
