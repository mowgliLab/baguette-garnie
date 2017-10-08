import { Connection, ConnectionManager, ConnectionOptions, getConnectionManager } from 'typeorm';
import { MenuEntity } from '../entyties/menu.entity';
import { SandwichEntity } from '../entyties/sandwich.entity';
import { BreadEntity } from '../entyties/bread.entity';
import { ToppingEntity } from '../entyties/topping.entity';
import { UserEntity } from '../entyties/user.entity';
import { OrderRowEntity } from '../entyties/order-row.entity';
import { OrderEntity } from '../entyties/order.entity';
import { SandwichOnMenuEntity } from '../entyties/sandwich-on-menu.entity';
import { StorageConfig } from '../options';

import * as _ from 'lodash';

export class ConnectionManagerBl {

    static connexionOptions = <ConnectionOptions> StorageConfig.parsed;
    static entities = {entities: [
        BreadEntity,
        MenuEntity,
        OrderEntity,
        OrderRowEntity,
        SandwichEntity,
        SandwichOnMenuEntity,
        ToppingEntity,
        UserEntity
    ]};

    public static getConnection(): Connection {
        const connectionManager: ConnectionManager = getConnectionManager();
        const options = _.merge(ConnectionManagerBl.connexionOptions, ConnectionManagerBl.entities);
        return connectionManager.create(options);
    }
}