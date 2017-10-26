import { SandwichModel } from '../models/sandwich.model';
import * as _ from 'lodash';
import { SandwichEntity } from '../entyties/sandwich.entity';

export class SandwichUtil {
    public static computeSandwichPrice(sandwich: SandwichModel | SandwichEntity, size = 3) {
        if (!sandwich.toppings || sandwich.toppings.length < 0 || !sandwich.bread) {
            return null;
        }

        // use formula sizedSandwichPrice = sandwichFullPrice * (2 + size)/5
        let totalPrice = _.sumBy(sandwich.toppings, t => t.price);
        totalPrice += sandwich.bread.price;

        return totalPrice * (2 + (+size)) / 5;

    }
}
