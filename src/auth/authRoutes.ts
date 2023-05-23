import { FastifyInstance } from 'fastify';
import { signInHandler } from './authController';

export default function (fastify: FastifyInstance, _: any, done: any) {
    fastify.post('/signin', signInHandler);
    done()
}