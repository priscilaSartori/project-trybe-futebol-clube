import { Request, Response, NextFunction } from 'express';
import TeamsService from '../services/teamsService';

class TeamController {
  constructor(private service: TeamsService) { }

  public getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const team = await this.service.getAll();
      return res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  };
}

export default TeamController;