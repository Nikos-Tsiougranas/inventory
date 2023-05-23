import {sequelize} from "../database/models";
import {CountExecution} from "../countexecutions/countExecution";
import {UserProductCount} from "./userProductCount";

const countExecutionRepository = sequelize.getRepository(CountExecution)
const userProductCountRepository = sequelize.getRepository(UserProductCount)

export async function createUserProductCount(
  countExecutionId: number,
  subProducts: {
    id: number,
    quantity: number
  }[],
  ownerId: number
): Promise<UserProductCount[]> {
  const countExecution: CountExecution = await countExecutionRepository.findByPk(countExecutionId)
  if (!countExecution || countExecution.status === 'ended') throw new Error("Count execution not active")
  const transaction = await sequelize.transaction();
  try {
    const newProductCounts = subProducts.map(async subProduct => {
      return await userProductCountRepository.create({
        countExecutionId: countExecution.id,
        quantity: subProduct.quantity,
        subproductId: subProduct.id,
        userId: ownerId
      }, {transaction})
    })
    const productCounts = await Promise.all(newProductCounts)
    await transaction.commit()
    return productCounts
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
