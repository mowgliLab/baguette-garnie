import { UserModel } from '../models/user.model';
import { getRepository, Repository } from 'typeorm';
import { UserEntity } from '../entyties/user.entity';
import * as bcrypt from 'bcrypt';

export class UserBl {

    /**
     * Create a user for registration.
     * This method only manage database insert and don't manage password encryption.
     *
     * @param {UserModel} user : the user to add to db.
     * @return {Promise<number>} id of the new added user, -1 if error on insert.
     */
    public addUser(user: UserModel): Promise<number> {
        const userRepository = getRepository(UserEntity);
        return userRepository
            .save(UserModel.toEntity(user))
            .then(res => res.id)
            .catch(error => -1);
    }

    public updateUser(user: UserModel): Promise<boolean> {
        const userRepository = getRepository(UserEntity);
        return userRepository
            .updateById(user.id, UserModel.toEntity(user))
            .then(res => true)
            .catch(error => false);
    }

    public checkAuthentication(mail: string, password: string): Promise<UserModel> {
        const userRepository = getRepository(UserEntity);
        return userRepository
            .findOne({mail: mail})
            .then(user => {
                if (bcrypt.compareSync(password, user.password)) {
                    return UserModel.fromEntity(user);
                } else {
                    return null;
                }
            });
    }


    // TODO remove after tests
    // ----------UTILS----------
    public getUser(userId: number): Promise<UserModel | void> {
        const userRepository = getRepository(UserEntity);
        return userRepository
            .findOneById(userId)
            .then(user => UserModel.fromEntity(user))
            .catch(error => console.log('user doesnot exist'));
    }

    public getUsers(): Promise<UserModel[]> {
        const userRepository = getRepository(UserEntity);
        return userRepository
            .find()
            .then(users => {
                const result = [];
                for (const u of users) {
                    result.push(UserModel.fromEntity(u));
                }
                return result;
            });
    }
}
