import { sign, verify } from 'jsonwebtoken';
import { IUser } from '../interfaces/ILogin';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const createToken = (login: IUser) => {
  const token = sign({ login }, secret, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });
  return token;
};

const verifyToken = (token:string) => verify(token, secret);

export default { createToken, verifyToken };
