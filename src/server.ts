import fastify, { FastifyInstance } from 'fastify'
import authRoutes from './auth/authRoutes';
import countPlanRoutes from './countplans/countPlanRoutes';
import productRoutes from './products/productRoutes';
import {startCountPlanCronJob} from "./countplans/countPlanJob";
import userProductCountRoutes from "./userproductcounts/userProductCountRoutes";
import countExecutionRoutes from "./countexecutions/countExecutionRoutes";

startCountPlanCronJob()

async function registerRoutes(fastify: FastifyInstance) {
    fastify.register(authRoutes);
    fastify.register(countPlanRoutes);
    fastify.register(productRoutes);
    fastify.register(userProductCountRoutes)
    fastify.register(countExecutionRoutes)
}
const server: FastifyInstance = fastify({ logger: true })
server.setErrorHandler(function (error, request, reply) {
    console.error(error)
    reply.send({
        error: 'Unhandled error occurred'
    })
});
const startServer = async () => {
    try {
        await registerRoutes(server)
        await server.listen(8080, '0.0.0.0')
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}
startServer();
