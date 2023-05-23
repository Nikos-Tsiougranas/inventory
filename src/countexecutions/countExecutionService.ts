import {sequelize} from "../database/models";
import {CountPlan} from "../countplans/countPlan";
import {Op} from "sequelize";
import {CountExecution} from "./countExecution";
import {UserProductCount} from "../userproductcounts/userProductCount";
import {Product} from "../products/product";
import {Subproduct} from "../products/subproduct";

const countPlanRepository = sequelize.getRepository(CountPlan)
const countPlanExecutionRepository = sequelize.getRepository(CountExecution)
const userProductCountRepository = sequelize.getRepository(UserProductCount)
const productRepository = sequelize.getRepository(Product)
const subProductRepository = sequelize.getRepository(Subproduct)
const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

export async function createCountExecutions() {
  const countPlansToCreateExecutions = [
    ...await fetchWeeklyCountPlansToCreate(),
    ...await fetchBiWeeklyCountPlansToCreate()
  ]

  countPlansToCreateExecutions.map(async countPlan => {
    await countPlanExecutionRepository.update(
      {status: 'ended'},
      {
        where: {
          countPlanId: countPlan.id,
          status: {[Op.ne]: 'ended'}
        }
      }
    );

    await countPlanExecutionRepository.create({
      countPlanId: countPlan.id,
      status: 'ongoing',
    });
    await countPlanRepository.update(
      {latestCountExecutionCreated: new Date()},
      {
        where: {
          id: countPlan.id,
        }
      }
    )
  })
}

async function fetchWeeklyCountPlansToCreate(): Promise<CountPlan[]> {
  const today = new Date()
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(today.getDate() - 6);
  const thisDay = days[today.getDay()];
  return await countPlanRepository.findAll({
    include: {
      model: countPlanExecutionRepository,
      required: false
    },
    where: {
      latestCountExecutionCreated: {
        [Op.or]: [
          { [Op.lte]: oneWeekAgo },
          { [Op.eq]: null }
        ]
      },
      day: thisDay,
      frequency: 'weekly'
    }
  });
}

async function fetchBiWeeklyCountPlansToCreate(): Promise<CountPlan[]> {
  const today = new Date()
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(today.getDate() - 13);
  const thisDay = days[today.getDay()];
  return await countPlanRepository.findAll({
    include: [{
      model: countPlanExecutionRepository,
      required: false,
    }],
    where: {
      latestCountExecutionCreated: {
        [Op.or]: [
          { [Op.lte]: twoWeeksAgo },
          { [Op.eq]: null }
        ]
      },
      day: thisDay,
      frequency: 'biweekly'
    }
  });
}

export async function startCountExecution(countPlanId: number): Promise<CountExecution> {
  await countPlanExecutionRepository.update(
    {status: 'started'},
    {
      where: {
        countPlanId: countPlanId,
        status: {[Op.eq]: 'ongoing'}
      }
    }
  );
  return (await countPlanExecutionRepository.findAll({
    where: {
      countPlanId: countPlanId,
      status: 'started'
    }
  }))[0]
}

export async function endCountExecution(countPlanId: number): Promise<CountExecution> {
  await countPlanExecutionRepository.update(
    {status: 'ended'},
    {
      where: {
        countPlanId: countPlanId,
        status: {[Op.eq]: 'started'}
      }
    }
  );
  return (await countPlanExecutionRepository.findAll({
    where: {
      countPlanId: countPlanId,
      status: 'ended'
    }
  }))[0]
}

export async function calculatePricePerProduct(countExecutionId: number): Promise<Map<Product, number>> {
  const userProductCounts = await userProductCountRepository.findAll(
    {where: {countExecutionId: countExecutionId},
            include: [{model: subProductRepository, include: [{model: productRepository, include: [subProductRepository]}]}]
    }
  )
  const subProductToQuantity = new Map<number, number>;
  const products = new Map<number, Product>;
  userProductCounts.map(userProductCount => {
    const existingValue = subProductToQuantity.get(userProductCount.subproductId) ?? 0
    subProductToQuantity.set(userProductCount.subproductId, existingValue + userProductCount.quantity)
    products.set(userProductCount.subproduct.product.id, userProductCount.subproduct.product)
  })
  const productsToPrice = new Map<Product, number>;
  products.forEach(product => {
    let counter = Number.MAX_SAFE_INTEGER
    product.subproducts.map(subProduct => {
      counter = Math.min(counter, Math.floor(subProductToQuantity.get(subProduct.id) / subProduct.quantity))
    })
    productsToPrice.set(product,counter * product.price)
  })
  return productsToPrice;
}
