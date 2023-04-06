import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class users extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: number;
}

users.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: STRING,
  },
  role: {
    type: STRING,
  },
  email: {
    type: STRING,
  },
  password: {
    type: INTEGER,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default users;
