import { DataTypes, Model } from 'sequelize';
import sequelize from "../db/database";

class Task extends Model {
    public id?: string;
    public userId!: string;
    public title!: string;
    public description?: string;
    public completion_status?: "PENDING" | "IN_PROGRESS" | "COMPLETED"
    public due_date!: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Task.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    completion_status: {
        type: DataTypes.ENUM("PENDING", "IN_PROGRESS", "COMPLETED"),
        allowNull: false,
        defaultValue: "PENDING"
    },
    due_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'tasks',
});

export default Task;
