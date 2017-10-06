import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { MenuService } from './services/menu.service';
import { HttpModule } from '@angular/http';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavbarComponent,
        MenuPageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule,
    ],
    providers: [
        MenuService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
