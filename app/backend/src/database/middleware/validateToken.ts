import { NextFunction, Request, Response } from 'express';
import token from '../utils/jwt.util';

export default class validateToken {
  public static validate(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const tokenVerify = token.verifyToken(authorization);
      req.body.data = tokenVerify;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
