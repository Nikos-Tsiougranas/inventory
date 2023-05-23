import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import {validateRequest} from "../auth/jwtService";
import {
  biWeeklyMondayCountPlanHandler,
  endCountPlanHandler,
  startCountPlanHandler,
  weeklyCountPlanHandler
} from "./countPlanController";

export default function (fastify: FastifyInstance, _: any, done: any) {
  fastify.route({
    method: 'POST',
    url: '/count-plan/weekly',
    preHandler: async (request: FastifyRequest, reply: FastifyReply) => {
      validateRequest(request, reply, ["admin"])
    },
    handler: weeklyCountPlanHandler,
  });

  fastify.route({
    method: 'POST',
    url: '/count-plan/bi-weekly/monday',
    preHandler: async (request: FastifyRequest, reply: FastifyReply) => {
      validateRequest(request, reply, ["admin"])
    },
    handler: biWeeklyMondayCountPlanHandler,
  });

  fastify.route({
    method: 'PUT',
    url: '/count-plan/:id/start',
    preHandler: async (request: FastifyRequest, reply: FastifyReply) => {
      validateRequest(request, reply, ["admin"])
    },
    handler: startCountPlanHandler,
  });

  fastify.route({
    method: 'PUT',
    url: '/count-plan/:id/end',
    preHandler: async (request: FastifyRequest, reply: FastifyReply) => {
      validateRequest(request, reply, ["admin"])
    },
    handler: endCountPlanHandler,
  });
  done()
}