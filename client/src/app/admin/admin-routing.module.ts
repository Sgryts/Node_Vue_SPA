import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GenresContainerComponent } from './genres/containers/genres-container.component';
import { PhotosUploadContainerComponent } from './photos/containers/photos-upload-container.component';
import { PhotosContainerComponent } from './photos/containers/photos-container.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [AdminGuard], canLoad: [AdminGuard]
  },
  {
    path: 'genres', component: GenresContainerComponent, canActivate: [AdminGuard], canLoad: [AdminGuard]
  },
  {
    path: 'genres/:id', component: GenresContainerComponent, canActivate: [AdminGuard], canLoad: [AdminGuard]
  },
  {
    path: 'photos', component: PhotosContainerComponent, canActivate: [AdminGuard], canLoad: [AdminGuard]
  },
  {
    path: 'photos/:id', component: PhotosContainerComponent, canActivate: [AdminGuard], canLoad: [AdminGuard]
  },
  {
    path: 'upload', component: PhotosUploadContainerComponent, canActivate: [AdminGuard], canLoad: [AdminGuard]
  },
  {
    path: 'login', component: LoginComponent, canActivate: [AuthGuard]
  },
  {
    path: '**', redirectTo: '/admin'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
