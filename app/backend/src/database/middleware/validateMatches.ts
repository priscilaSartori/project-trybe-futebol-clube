import { NextFunction, Request, Response } from 'express';
import TeamsService from '../services/teamsService';

class validateMatches {
  constructor(private teamsService: TeamsService) { }

  public validate = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeamId, awayTeamId } = req.body;

    const home = await this.teamsService.getById(Number(homeTeamId));
    const away = await this.teamsService.getById(Number(awayTeamId));
    if (!home || !away) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    if (homeTeamId === awayTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    next();
  };
}

export default validateMatches;
