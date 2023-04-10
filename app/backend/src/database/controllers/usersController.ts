import { Request, Response, NextFunction } from 'express';
import UserService from '../services/usersService';
import Token from '../utils/jwt.util';

class usersController {
  constructor(private service: UserService) {}

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const { type, message } = await this.service.getByEmail(email, password);
      if (type) {
        return res.status(type).json(message);
      }
      const token = Token.createToken({ email, password });
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };
}

export default usersController;