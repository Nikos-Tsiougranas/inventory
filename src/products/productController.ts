import {FastifyRequest, FastifyReply} from 'fastify';
import {createProduct} from "./productService";

interface ProductCreate {
  name: string,
  price: number,
  category: string,
  subProducts: {
    name: string,
    quantity: number,
    barcodes: string[]
  }[]
}

export async function productCreateHandler(request: FastifyRequest<{ Body: ProductCreate }>, reply: FastifyReply) {
  try {
    const product: ProductCreate = request.body;
    const {name, price, category, subProducts} = product;
    const newProduct = await createProduct(name, price, category, subProducts)
    return reply.code(200).send({product: newProduct})
  } catch (error) {
    reply.code(500).send({error: 'Internal Server Error'});
  }
}
