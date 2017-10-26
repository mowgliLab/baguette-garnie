import { SandwichModel } from '../models/sandwich.model';
import * as _ from 'lodash';

export class SandwichUtil {
    public static computeSandwichPrice(sandwich: SandwichModel, size = 1) {
        if (!sandwich.toppings || sandwich.toppings.length < 0 || !sandwich.bread) {
            return null;
        }

        // use formula sizedSandwichPrice = sandwichFullPrice * (2 + size)/5
        let totalPrice = _.sumBy(sandwich.toppings, t => t.price);
        totalPrice += sandwich.bread.price;

        return totalPrice * (2 + (+size)) / 5;

    }

    public static computeSandwichPriceFromFullPrice(sandwich: SandwichModel, size = 1) {
        if (!sandwich.price || sandwich.price < 0) {
            return null;
        }

        // use formula sizedSandwichPrice = sandwichFullPrice * (2 + size)/5
        return sandwich.price * (2 + (+size)) / 5;

    }
}
