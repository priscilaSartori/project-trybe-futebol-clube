import { ModelStatic } from 'sequelize';
import TeamsModel from '../models/teamsModel';

class TeamService {
  private teamModel: ModelStatic<TeamsModel>;
  constructor(teamsModel: ModelStatic<TeamsModel>) {
    this.teamModel = teamsModel;
  }

  public async getAll(): Promise<TeamsModel[]> {
    const result = await this.teamModel.findAll();
    return result;
  }
}
export default TeamService;
