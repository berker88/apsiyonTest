import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContentListPageComponent} from './pages/content-list-page/content-list-page.component';
import {ContentAddPageComponent} from './pages/content-add-page/content-add-page.component';

const routes: Routes = [
  {
    path: '',
    component: ContentListPageComponent,
  },
  {
    path: 'add',
    component: ContentAddPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
