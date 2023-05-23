import {sequelize} from "../database/models";
import {CountPlan} from "./countPlan";
import {CountPlanUser} from "./countPlanUser";
import {CountExecution} from "../countexecutions/countExecution";
import {endCountExecution, startCountExecution} from "../countexecutions/countExecutionService";

const countPlanRepository = sequelize.getRepository(CountPlan)
const countPlanUserRepository = sequelize.getRepository(CountPlanUser)

export async function createCountPlan(name: string, ownerId: number, day: string, frequency: string, usersToNotify: number[]): Promise<CountPlan> {
  const transaction = await sequelize.transaction();
  try {
    const countPlan = await countPlanRepository.create({
      name: name,
      ownerId: ownerId,
      weekDay: day,
      frequency: frequency
    }, { transaction });

    const promises = usersToNotify.map(userId => {
      return countPlanUserRepository.create({
        countPlanId: countPlan.id,
        userId: userId,
      }, { transaction });
    });

    await Promise.all(promises);
    await transaction.commit();
    return countPlan;
  } catch (error) {
    // If anything goes wrong, roll back the transaction
    await transaction.rollback();
    throw error;
  }
}

export async function startCountPlan(countPlanId: number): Promise<CountExecution> {
  return await startCountExecution(countPlanId)
}

export async function endCountPlan(countPlanId: number): Promise<CountExecution> {
  return await endCountExecution(countPlanId)
}
