'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('matches', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    homeTeamId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      field: "home_team_id",
      references: {
        model: 'teams',
        key: 'id',
      }
    },
    homeTeamGoals: {
      allowNull: false,
      type: Sequelize.INTEGER,
      field: "home_team_goals",
    },
    awayTeamId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      field: "away_team_id",
      references: {
        model: 'teams',
        key: 'id',
      }
    },
    awayTeamGoals: {
      allowNull: false,
      type: Sequelize.INTEGER,
      field: "away_team_goals",
    },
    inProgress: {
      type: Sequelize.BOOLEAN,
      field: "in_progress",
    },
  });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('matches');
  }
};
