import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';

class TeamController {
  constructor(private service: TeamsService) { }

  public getAll = async (_req: Request, res: Response) => {
    const team = await this.service.getAll();
    return res.status(200).json(team);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this.service.getById(Number(id));
    return res.status(200).json(team);
  };
}

export default TeamController;
