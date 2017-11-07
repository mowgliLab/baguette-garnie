import { Component, OnInit } from '@angular/core';
import { ToppingService } from '../../services/topping.service';
import { ToppingModel } from '../../models/topping.model';
import { BreadService } from '../../services/bread.service';
import { BreadModel } from '../../models/bread.model';
import * as _ from 'lodash';
@Component({
  selector: 'app-custom-sandwich',
  templateUrl: './custom-sandwich.component.html',
  styleUrls: ['./custom-sandwich.component.css']
})
export class CustomSandwichComponent implements OnInit {

  toppings = {};
  toppingsArray = [];
  breads: Array<BreadModel>;
  constructor(
    private toppingService: ToppingService,
    private breadService : BreadService

  ) { }

  private logToppingName: string ='';
  
  private writeInBasket(element: HTMLInputElement): void {
    this.logToppingName += `${element.value} \n`;
  }
  private logBreadName ='';

  private addBreadInBasket(element: string) : void {
    this.logBreadName = `${element} \n`;
  }
  

  ngOnInit() {

    this.toppingService.getToppings()
    .then(toppings => {
        //this.toppings = toppings;
        this.toppings = _.groupBy(toppings, t => t.type);
        this.toppingsArray = toppings
        console.log('getToppings end', this.toppings);

        
    });
    this.breadService.getBreads()
    .then(breads => {
      console.log('getBreads end', breads);
      this.breads = breads;
    });
    
// this.availlableSize = SandwichModel.sizeValues;

  }

  get selectedOptions() { 
  return this.toppingsArray
            .filter(opt => opt.checked);
  }
  getTotalToppings() {
    let total = 0;
    for (var i = 0; i < this.selectedOptions.length; i++) {
        if (this.selectedOptions[i].price) {
            total += this.selectedOptions[i].price;
            
        }
    }
    return total;
  
}
  
  

}
