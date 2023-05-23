import {User} from "../users/user";
import {sequelize} from "../database/models";
import {verifyPassword} from "./passwordValidator";
import {generateJWT} from "./jwtService";
const userRepository = sequelize.getRepository(User);

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export async function authenticate(email: string, password: string): Promise<string> {
  const user: User = await userRepository.findOne({ where: { email } });
  if (!user) throw new AuthenticationError('Invalid email or password')
  const isVerified = verifyPassword(user.password, password)
  if (!isVerified) throw new AuthenticationError('Invalid email or password')
  return generateJWT(user)
}