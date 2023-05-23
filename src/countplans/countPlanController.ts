import {FastifyRequest, FastifyReply} from 'fastify';
import {createCountPlan, endCountPlan, startCountPlan} from "./countPlanService";

interface CountPlanWeeklyCreate {
  name: string,
  ownerId: number,
  day: string,
  usersToNotify: number[]
}

export async function weeklyCountPlanHandler(request: FastifyRequest<{ Body: CountPlanWeeklyCreate }>, reply: FastifyReply) {
  try {
    const countPlan: CountPlanWeeklyCreate = request.body;
    const {name, ownerId, day, usersToNotify} = countPlan;
    const newCountPlan = await createCountPlan(name, ownerId, day, "weekly", usersToNotify)
    return reply.code(200).send({countPlan: newCountPlan})
  } catch (error) {
    reply.code(500).send({error: 'Internal Server Error'});
  }
}

interface CountPlanBiWeeklyMondayCreate {
  name: string,
  ownerId: number,
  usersToNotify: number[]
}

export async function biWeeklyMondayCountPlanHandler(request: FastifyRequest<{ Body: CountPlanBiWeeklyMondayCreate }>, reply: FastifyReply) {
  try {
    const countPlan: CountPlanBiWeeklyMondayCreate = request.body;
    const {name, ownerId, usersToNotify} = countPlan;
    const newCountPlan = await createCountPlan(name, ownerId, "monday", "biweekly", usersToNotify)
    return reply.code(200).send({countPlan: newCountPlan})
  } catch (error) {
    reply.code(500).send({error: 'Internal Server Error'});
  }
}

export async function startCountPlanHandler(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
  try {
    const countPlanId: number = request.params.id;
    const executionPlan = await startCountPlan(countPlanId)
    return reply.code(200).send({executionPlan})
  } catch (error) {
    reply.code(500).send({error: 'Internal Server Error'});
  }
}

export async function endCountPlanHandler(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
  try {
    const countPlanId: number = request.params.id;
    const executionPlan = await endCountPlan(countPlanId)
    return reply.code(200).send({executionPlan})
  } catch (error) {
    reply.code(500).send({error: 'Internal Server Error'});
  }
}