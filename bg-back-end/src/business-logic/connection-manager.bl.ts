import { Connection, ConnectionOptions, getConnection, createConnection, ConnectionManager, getConnectionManager } from 'typeorm';
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

    public static getConnection(): Connection {
        try {
            // if connection already exist, return it;
            console.log('try to get connection');
            const connection = getConnection();
            console.log(connection);
            if (connection) {
                return connection;
            }
        } catch (error) {
            // else initialize it.
            const connectionManager: ConnectionManager = getConnectionManager();
            const options = _.merge(ConnectionManagerBl.connexionOptions, ConnectionManagerBl.entities);
            return connectionManager.create(options);
        }

    }
}
