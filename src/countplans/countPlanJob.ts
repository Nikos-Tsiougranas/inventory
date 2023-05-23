import cron from "node-cron"
import {createCountExecutions} from "../countexecutions/countExecutionService";

export async function startCountPlanCronJob() {
  cron.schedule('0 0 * * *', () => {
    createCountExecutions()
  }, {
    scheduled: true
  });
}
