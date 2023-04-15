import { ModelStatic } from 'sequelize';
import TeamsModel from '../models/teamsModel';
import ITeam from '../interfaces/ITeam';

class TeamService {
  private teamModel: ModelStatic<TeamsModel>;
  constructor(teamsModel: ModelStatic<TeamsModel>) {
    this.teamModel = teamsModel;
  }

  public async getAll(): Promise<TeamsModel[]> {
    const team = await this.teamModel.findAll();
    return team;
  }

  public async getById(id: number): Promise<ITeam | null> {
    const team = await this.teamModel.findByPk(id);
    return team;
  }
}
export default TeamService;
