import { Request, Response, NextFunction } from 'express';
import MatchesService from '../services/matchesService';

class MatchesController {
  constructor(private matchesService: MatchesService) { }

  public getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const matches = await this.matchesService.getAll();
      res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  };
}

export default MatchesController;
