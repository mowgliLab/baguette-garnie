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
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { SandwichService } from './services/sandwich.service';
import { CustomSandwichComponent } from './components/custom-sandwich/custom-sandwich.component';
import { ToppingService } from './services/topping.service';
import { BreadService } from './services/bread.service';
import { MemoryService } from './services/memory.service';
import { BsDropdownModule, AlertModule } from 'ngx-bootstrap';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ProfilPageComponent } from './components/profil-page/profil-page.component';
import { MySandwichesPageComponent } from './components/my-sandwiches-page/my-sandwiches-page.component';
import { OrderHistoryPageComponent } from './components/order-history-page/order-history-page.component';
import { AuthenticationGuard } from './guards/AuthenticationGuard';
import { OrderConfirmPageComponent } from './components/order-confirm-page/order-confirm-page.component';
import { OrderService } from './services/order.service';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { AlertComponent } from './components/alert/alert.component';
import { AlertService } from './services/alert.service';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavbarComponent,
        MenuPageComponent,
        SandwichElementComponent,
        ContactPageComponent,
        TeamPageComponent,
        CustomSandwichComponent,
        OrderPageComponent,
        RegisterPageComponent,
        LoginPageComponent,
        ProfilPageComponent,
        MySandwichesPageComponent,
        OrderHistoryPageComponent,
        OrderConfirmPageComponent,
        AlertComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),
        BsDropdownModule.forRoot()
    ],
    providers: [
        OrderService,
        MenuService,
        SandwichService,
        ToppingService,
        BreadService,
        BsModalService,
        MemoryService,
        AuthenticationService,
        UserService,
        AlertService,
        FormBuilder,
        AuthenticationGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
