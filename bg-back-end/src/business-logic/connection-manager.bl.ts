import { ConnectionOptions } from 'typeorm';
import { MenuEntity } from '../entyties/menu.entity';
import { SandwichEntity } from '../entyties/sandwich.entity';
import { BreadEntity } from '../entyties/bread.entity';
import { ToppingEntity } from '../entyties/topping.entity';
import { UserEntity } from '../entyties/user.entity';
import { OrderRowEntity } from '../entyties/order-row.entity';
import { OrderEntity } from '../entyties/order.entity';
import { SandwichOnMenuEntity } from '../entyties/sandwich-on-menu.entity';
import { StorageConfig } from '../options';

export class ConnectionManagerBl {

    public static connexionOptions = <ConnectionOptions> StorageConfig.parsed;
    public static entities = {entities: [
        BreadEntity,
        MenuEntity,
        OrderEntity,
        OrderRowEntity,
        SandwichEntity,
        SandwichOnMenuEntity,
        ToppingEntity,
        UserEntity
    ]};

}
