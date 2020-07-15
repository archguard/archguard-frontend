import { Random } from "mockjs";

function scanProject() {
  return {
    isrunning: Random.boolean()
  };
}

export default scanProject;
