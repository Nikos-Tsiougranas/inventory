import { FastifyRequest, FastifyReply } from 'fastify';
import {authenticate, AuthenticationError} from "./authService";

interface SignIn {
    email: string
    password: string
}

export async function signInHandler(request: FastifyRequest<{ Body: SignIn }>, reply: FastifyReply) {
    try {
        const signIn: SignIn = request.body;
        const { email, password } = signIn;
        const token = await authenticate(email, password)
        return reply.send({ token })
    } catch (error) {
        if (error instanceof AuthenticationError) {
            reply.code(401).send({ error: error.message })
        } else {
            reply.code(500).send({ error: 'Internal Server Error' });
        }
    }
}