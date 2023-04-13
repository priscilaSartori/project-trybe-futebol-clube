import matchesModel from "../../database/models/matchesModel";

const matchesInProgressMock = [
  {
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
  },
  {
    homeTeamId: 6,
    homeTeamGoals: 1,
    awayTeamId: 1,
    awayTeamGoals: 0,
    inProgress: true,
  },
  {
    homeTeamId: 11,
    homeTeamGoals: 0,
    awayTeamId: 10,
    awayTeamGoals: 0,
    inProgress: true,
  },
  {
    homeTeamId: 7,
    homeTeamGoals: 2,
    awayTeamId: 15,
    awayTeamGoals: 2,
    inProgress: true,
  },
  {
    homeTeamId: 5,
    homeTeamGoals: 1,
    awayTeamId: 3,
    awayTeamGoals: 1,
    inProgress: true,
  },
  {
    homeTeamId: 4,
    homeTeamGoals: 1,
    awayTeamId: 12,
    awayTeamGoals: 1,
    inProgress: true,
  },
  {
    homeTeamId: 8,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 2,
    inProgress: true,
  },
  {
    homeTeamId: 13,
    homeTeamGoals: 1,
    awayTeamId: 2,
    awayTeamGoals: 1,
    inProgress: true,
  }
] as matchesModel[];

export default matchesInProgressMock;
