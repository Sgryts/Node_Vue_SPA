import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/components/about.component';
import { ContactComponent } from './contact/components/contact.component';
import { HomeComponent } from './home/components/home.component';
import { PortfolioContainerComponent } from './portfolio/containers/portfolio-container.component';
import { PageNotFoundComponent } from './shared/PageNotFound.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'photos', component: PortfolioContainerComponent
  },
  {
    path: 'contact', component: ContactComponent
  },
  {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
