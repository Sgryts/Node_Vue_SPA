import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GenresContainerComponent } from './genres/containers/genres-container.component';
import { PhotosUploadContainerComponent } from './photos/containers/photos-upload-container.component';
import { PhotosContainerComponent } from './photos/containers/photos-container.component';
import { LoginComponent } from './login/login.component';

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
    path: 'photos', component: PhotosContainerComponent,
  },
  {
    path: 'photos/:id', component: PhotosContainerComponent,
  },
  {
    path: 'upload', component: PhotosUploadContainerComponent
  },
  {
    path: 'login', component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
