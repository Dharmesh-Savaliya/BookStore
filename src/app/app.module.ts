import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { SearchBookComponent } from './page/search-book/search-book.component';
import { MenuComponent } from './page/menu/menu.component';
import { CoreService } from './services/core.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchBookComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports:[MenuComponent],
  providers: [CoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
