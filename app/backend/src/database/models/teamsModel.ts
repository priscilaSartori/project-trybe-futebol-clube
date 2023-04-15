import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class teams extends Model {
  declare id: number;
  declare teamName: string;
}

teams.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  teamName: {
    type: STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default teams;
