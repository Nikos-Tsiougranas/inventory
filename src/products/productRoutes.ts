import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import {validateRequest} from "../auth/jwtService";
import {productCreateHandler} from "./productController";

export default function (fastify: FastifyInstance, _: any, done: any) {
  fastify.route({
    method: 'POST',
    url: '/product',
    preHandler: async (request: FastifyRequest, reply: FastifyReply) => {
      validateRequest(request, reply, ["admin"])
    },
    handler: productCreateHandler,
  });
  done()
}