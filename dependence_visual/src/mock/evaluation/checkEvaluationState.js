import { Random } from "mockjs";

function scanSystem() {
  return {
    isRunning: Random.boolean(),
  };
}

export default scanSystem;
