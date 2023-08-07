import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoctailsListComponent } from './coctails-list/coctails-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CoctailComponent } from './coctail/coctail.component';

@NgModule({
  declarations: [
    AppComponent,
    CoctailsListComponent,
    CoctailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
