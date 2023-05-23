import { FastifyRequest, FastifyReply } from 'fastify';
import {createUserProductCount} from "./userProductCountService";

interface ProductCountAdd {
  countExecutionId: number,
  subProducts: {
    id: number,
    quantity: number
  }[],
  ownerId: number
}

export async function productCountAdd(request: FastifyRequest<{ Body: ProductCountAdd }>, reply: FastifyReply) {
  try {
    const productCount: ProductCountAdd = request.body;
    const { countExecutionId, subProducts, ownerId } = productCount;
    const productCounts = await createUserProductCount(countExecutionId, subProducts, ownerId)
    return reply.send({ productCounts })
  } catch (error) {
    console.log(error)
    reply.code(500).send({ error: 'Internal Server Error' });
  }
}