import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Menu } from '../models/menu.model';

@Component({
    selector: 'app-menu-page',
    templateUrl: './menu-page.component.html',
    styleUrls: ['./menu-page.component.css']
})
export class MenuPageComponent implements OnInit {

    menu: Menu;

    constructor(private menuService: MenuService) {
    }

    ngOnInit() {
        this.menuService.getMenu()
            .then(menu => {
                console.log('getMenu end', menu);
                this.menu = menu;
            });
    }

}
