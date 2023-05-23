import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import {validateRequest} from "../auth/jwtService";
import {pricePerCategory, pricePerProduct, totalPrice} from "./countExecutionController";

export default function (fastify: FastifyInstance, _: any, done: any) {
  fastify.route({
    method: 'GET',
    url: '/countexecution/:id/productprice',
    preHandler: async (request: FastifyRequest, reply: FastifyReply) => {
      validateRequest(request, reply, ["admin"])
    },
    handler: pricePerProduct,
  });

  fastify.route({
    method: 'GET',
    url: '/countexecution/:id/categoryprice',
    preHandler: async (request: FastifyRequest, reply: FastifyReply) => {
      validateRequest(request, reply, ["admin"])
    },
    handler: pricePerCategory,
  });

  fastify.route({
    method: 'GET',
    url: '/countexecution/:id/totalprice',
    preHandler: async (request: FastifyRequest, reply: FastifyReply) => {
      validateRequest(request, reply, ["admin"])
    },
    handler: totalPrice,
  });
  done()
}