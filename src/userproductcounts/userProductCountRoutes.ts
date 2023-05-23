import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import {validateRequest} from "../auth/jwtService";
import {productCountAdd} from "./userProductCountController";

export default function (fastify: FastifyInstance, _: any, done: any) {
  fastify.route({
    method: 'PUT',
    url: '/countplan/product-count',
    preHandler: async (request: FastifyRequest, reply: FastifyReply) => {
      validateRequest(request, reply, ["admin", "counter"])
    },
    handler: productCountAdd,
  });

  done()
}