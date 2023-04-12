import { Model, INTEGER, BOOLEAN } from 'sequelize';
import TeamsModel from './teamsModel';
import db from '.';

class matches extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

matches.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  homeTeamId: {
    type: INTEGER,
  },
  homeTeamGoals: {
    type: INTEGER,
  },
  awayTeamId: {
    type: INTEGER,
  },
  awayTeamGoals: {
    type: INTEGER,
  },
  inProgress: {
    type: BOOLEAN,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

TeamsModel.hasMany(matches, { foreignKey: 'homeTeamId', as: 'homeMatch' });
TeamsModel.hasMany(matches, { foreignKey: 'awayTeamId', as: 'awayMatch' });

matches.belongsTo(TeamsModel, { foreignKey: 'homeTeamId', as: 'homeTeam' });
matches.belongsTo(TeamsModel, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default matches;
