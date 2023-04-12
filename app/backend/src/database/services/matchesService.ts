import { ModelStatic } from 'sequelize';
import MatchesModel from '../models/matchesModel';
import TeamsModel from '../models/teamsModel';
// import { ITeam } from '../interfaces/ITeam';

class MatchesService {
  private matchesModel: ModelStatic<MatchesModel>;
  private teamsModel: ModelStatic<TeamsModel>;

  constructor(matchesModel: ModelStatic<MatchesModel>, teamsModel: ModelStatic<TeamsModel>) {
    this.matchesModel = matchesModel;
    this.teamsModel = teamsModel;
  }

  public async getAll(): Promise<MatchesModel[]> {
    const matches = await this.matchesModel.findAll({
      include: [
        {
          model: this.teamsModel,
          as: 'awayTeam',
        },
        {
          model: this.teamsModel,
          as: 'homeTeam',
        }],
    });
    return matches;
  }

  public async getInProgress(inProgress: string): Promise<MatchesModel[]> {
    const matches = await this.matchesModel.findAll({
      where: { inProgress: inProgress === 'true' },
      include: [
        {
          model: this.teamsModel,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: this.teamsModel,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        }],
    });
    return matches;
  }

  public async update(id: number) {
    await this.matchesModel.update({ inProgress: false }, { where: { id: Number(id) } });
  }

  public async updateMatches(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    await this.matchesModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id: Number(id) } });
  }
}
export default MatchesService;
