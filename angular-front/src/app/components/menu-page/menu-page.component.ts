import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { MenuModel } from '../../models/menu.model';

@Component({
    selector: 'app-menu-page',
    templateUrl: './menu-page.component.html',
    styleUrls: ['./menu-page.component.css']
})
export class MenuPageComponent implements OnInit {

    menu: MenuModel;

    constructor(private menuService: MenuService) {
    }

    ngOnInit() {
        this.menuService.getMenu()
            .then(menu => {
                console.log('getMenu end', menu);
                this.menu = menu;
            });
    }

    openCustomSandwichEditor(event: any) {
        event.stopPropagation();
        alert('open editor');
        return false;
    }
}
