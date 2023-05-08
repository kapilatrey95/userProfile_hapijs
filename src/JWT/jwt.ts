import * as jwt from 'jsonwebtoken';
import * as Dotenv from 'dotenv';
import { userProfileModel } from '../model/userProfile';
Dotenv.config();


const JWT_ALGORITHM = 'HS256';
const JWT_SECRET:any = process.env.JWT_SECRET

export function createToken(user: userProfileModel): string {
  const payload = { id: user.id, userNmae: user.userName };
  return jwt.sign(payload, JWT_SECRET, { algorithm: JWT_ALGORITHM });
}

export async function validateToken(decoded: any) {
  const user = await userProfileModel.findByPk(decoded.id);
  if (!user) {
    return { isValid: false };
  }
  return { isValid: true };
}
