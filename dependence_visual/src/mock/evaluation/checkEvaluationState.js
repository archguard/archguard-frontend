import { Random } from "mockjs";

function scanProject() {
  return {
    isRunning: Random.boolean(),
  };
}

export default scanProject;
