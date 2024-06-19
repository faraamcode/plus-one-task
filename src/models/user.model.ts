import { DataTypes, Model } from 'sequelize';
import sequelize from "../db/database";
import { Sequelize } from 'sequelize';

import { hashPassword } from '../util/encrypt';
import Task from './task.model';

class User extends Model {
    public id?: string;
    public name!: string;
    public email!: string;
    public password!: string;
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;


    static associate() {
        User.hasMany(Task, { foreignKey: 'userId', as: 'tasks' });
    }
}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'users',
    hooks: {
        beforeSave: async (user: User) => {
            if (user.changed('password')) {
                user.password = await hashPassword(user.password);
            }
        }
    }
});

export default User;
