import { ModelStatic } from 'sequelize';
import MatchesModel from '../models/matchesModel';
import TeamsModel from '../models/teamsModel';

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
}
export default MatchesService;
