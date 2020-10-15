import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MenuComponent } from './page/menu/menu.component';
import { SearchBookComponent } from './page/search-book/search-book.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'menu', pathMatch: 'full'
  },
  {
    path: 'menu', component: MenuComponent
  },
  {
    path: 'bookDetails', component: SearchBookComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
