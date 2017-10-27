import { Component, OnInit } from '@angular/core';
import { ToppingService } from '../../services/topping.service';
import { ToppingModel } from '../../models/topping.model';
import { BreadService } from '../../services/bread.service';
import { BreadModel } from '../../models/bread.model';
@Component({
  selector: 'app-custom-sandwich',
  templateUrl: './custom-sandwich.component.html',
  styleUrls: ['./custom-sandwich.component.css']
})
export class CustomSandwichComponent implements OnInit {

  toppings: Array<ToppingModel>;
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
        console.log('getToppings end', toppings);
        this.toppings = toppings;
    });
    this.breadService.getBreads()
    .then(breads => {
      console.log('getBreads end', breads);
      this.breads = breads;
    } )
// this.availlableSize = SandwichModel.sizeValues;

  }

  get selectedOptions() { 
  return this.toppings
            .filter(opt => opt.checked);
}
  

}
