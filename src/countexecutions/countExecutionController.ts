import {FastifyRequest, FastifyReply} from 'fastify';
import {calculatePricePerProduct} from "./countExecutionService";

export async function pricePerProduct(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
  const {id} = request.params;
  try {
    const pricePerProduct = await calculatePricePerProduct(id)
    const convertedMap = new Map<string, number>();
    for (const [product, value] of pricePerProduct.entries()) {
      convertedMap.set(product.name, value);
    }
    reply.code(200).send({pricePerProduct: JSON.stringify(Array.from(convertedMap.entries()))})
  } catch (error) {
    reply.code(500).send({error: 'Internal Server Error'});
  }
}

export async function pricePerCategory(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
  const {id} = request.params;
  try {
    const pricePerProduct = await calculatePricePerProduct(id)
    const convertedMap = new Map<string, number>();
    console.log(pricePerProduct)
    for (const [product, value] of pricePerProduct.entries()) {
      const existingValue = convertedMap.get(product.category) ?? 0
      convertedMap.set(product.category, existingValue + value)
    }
    reply.code(200).send({pricePerCategory: JSON.stringify(Array.from(convertedMap.entries()))})
  } catch (error) {
    reply.code(500).send({error: 'Internal Server Error'});
  }
}

export async function totalPrice(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
  const {id} = request.params;
  try {
    const pricePerProduct = await calculatePricePerProduct(id)
    let totalPrice = 0
    for (const [product, value] of pricePerProduct.entries()) {
      totalPrice += value
    }
    reply.code(200).send({totalPrice})
  } catch (error) {
    reply.code(500).send({error: 'Internal Server Error'});
  }
}