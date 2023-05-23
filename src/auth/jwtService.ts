import {User} from "../users/user";
import jwt from "jsonwebtoken"
import {FastifyReply, FastifyRequest} from "fastify";

const secretKey = process.env.JWT_SECRET || "myTestSecret";
const options = { expiresIn: '1h' };

interface JWTPayload {
  userId: number,
  email: string,
  role: string
}

export function generateJWT(user: User): string {
  const payload: JWTPayload = { userId: user.id, email: user.email, role: user.role };
  return jwt.sign(payload, secretKey, options);
}

function validateJWT(token: string): JWTPayload {
  return jwt.verify(token, secretKey) as JWTPayload
}

export async function validateRequest(request: FastifyRequest, reply: FastifyReply, roles: string[]) {
  try {
    const token = request.headers.authorization;
    const payload = validateJWT(token);
    if (!payload || payload.role !in roles) {
      reply.code(401).send({ error: 'Unauthorized' });
    }
    return payload
  } catch (error) {
    reply.code(401).send({ error: 'Unauthorized' });
  }
}