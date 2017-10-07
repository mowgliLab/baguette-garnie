import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuPageComponent } from './components/menu-page/menu-page.component';
import { MenuService } from './services/menu.service';
import { HttpModule } from '@angular/http';
import { SandwichElementComponent } from './components/sandwich-element/sandwich-element.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { TeamPageComponent } from './components/team-page/team-page.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavbarComponent,
        MenuPageComponent,
        SandwichElementComponent,
        ContactPageComponent,
        TeamPageComponent
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
export class AppModule {}
