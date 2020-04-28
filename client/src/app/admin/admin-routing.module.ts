import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GenresComponent } from './genres/genres.component';
import { GenresContainerComponent } from './genres/genres.container';
import { PhotosComponent } from './photos/photos.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent
  },
  {
    path: 'genres', component: GenresContainerComponent
  },
  {
    path: 'genres/:id', component: GenresContainerComponent
  },
  {
    path: 'photos', component: PhotosComponent
  },
  {
    path: 'photos/:id', component: PhotosComponent
  },
  {
    path: '**', component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
