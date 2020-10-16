import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './client/shared/PageNotFound.component';


const routes = [
  {
    path: '',
    loadChildren: () =>
      import('./client/client.module').then(m => m.ClientModule)
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then(m => m.AdminModule)
  },
  // { path: '', redirectTo: '/photos', pathMatch: 'full' },
  {
    path: '**', component: PageNotFoundComponent
  },
  // { preloadingStrategy: PreloadAllModules }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
