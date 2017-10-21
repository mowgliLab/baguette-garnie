import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "../components/home/home.component";
import { MenuPageComponent } from '../components/menu-page/menu-page.component';
import { TeamPageComponent } from '../components/team-page/team-page.component';
import { ContactPageComponent } from '../components/contact-page/contact-page.component';
import { CustomSandwichComponent } from '../components/custom-sandwich/custom-sandwich.component';
import { OrderPageComponent } from '../components/order-page/order-page.component';

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'menu', component: MenuPageComponent},
    {path: 'team', component: TeamPageComponent},
    {path: 'contact', component: ContactPageComponent},
    {path: 'custom', component: CustomSandwichComponent},
    {path: 'order', component: OrderPageComponent},

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
