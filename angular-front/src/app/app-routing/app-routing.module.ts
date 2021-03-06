import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "../components/home/home.component";
import { MenuPageComponent } from '../components/menu-page/menu-page.component';
import { TeamPageComponent } from '../components/team-page/team-page.component';
import { ContactPageComponent } from '../components/contact-page/contact-page.component';
import { CustomSandwichComponent } from '../components/custom-sandwich/custom-sandwich.component';
import { OrderPageComponent } from '../components/order-page/order-page.component';
import { RegisterPageComponent } from '../components/register-page/register-page.component';
import { LoginPageComponent } from '../components/login-page/login-page.component';
import { ProfilPageComponent } from '../components/profil-page/profil-page.component';
import { OrderHistoryPageComponent } from '../components/order-history-page/order-history-page.component';
import { MySandwichesPageComponent } from '../components/my-sandwiches-page/my-sandwiches-page.component';
import { AuthenticationGuard } from '../guards/AuthenticationGuard';
import { OrderConfirmPageComponent } from '../components/order-confirm-page/order-confirm-page.component';

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'menu', component: MenuPageComponent},
    {path: 'team', component: TeamPageComponent},
    {path: 'contact', component: ContactPageComponent},
    {path: 'custom', component: CustomSandwichComponent},
    {path: 'order', component: OrderPageComponent},
    {path: 'register', component: RegisterPageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'my-profil', component: ProfilPageComponent, canActivate: [AuthenticationGuard] },
    {path: 'my-orders', component: OrderHistoryPageComponent, canActivate: [AuthenticationGuard] },
    {path: 'my-sandwiches', component: MySandwichesPageComponent,  canActivate: [AuthenticationGuard] },
    {path: 'confirm', component: OrderConfirmPageComponent,  canActivate: [AuthenticationGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
