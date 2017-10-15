import { UserEntity } from '../entyties/user.entity';

export class UserModel {
    public id: number;
    public firstname: string;
    public lastname: string;
    public mail: string;
    public totalLoyalty: number;
    public password: string;

    public static fromEntity(entity: UserEntity): UserModel {
        const result = new UserModel();

        result.id = entity.id;
        result.firstname = entity.firstname;
        result.lastname = entity.lastname;
        result.mail = entity.mail;
        result.totalLoyalty = entity.totalLoyalty;
        result.password = entity.password;

        return result;
    }

    public static toEntity(user: UserModel): UserEntity {
        const entity = new UserEntity();

        entity.id = user.id;
        entity.firstname = user.firstname;
        entity.lastname = user.lastname;
        entity.mail = user.mail;
        entity.totalLoyalty = user.totalLoyalty;
        entity.password = user.password;

        return entity;
    }
}
