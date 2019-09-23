import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ProjectComponent } from './Components/project/project.component';


const routes: Routes = [
  {
    path: '',
    component:HomeComponent
  },
  {
    path: 'unauthorized',
    component:HomeComponent
  },
  {
    path: 'projects',
    component:ProjectComponent
  },
  {
    path: 'id_token',
    component:HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
