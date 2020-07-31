import Mock from "mockjs";

import queryScannerConfig from "./queryScannerConfig";
import updateScannerConfig from "./updateScannerConfig";

Mock.mock(/\/scanner\/config/, "get", queryScannerConfig);
Mock.mock(/\/scanner\/config/, "put", updateScannerConfig);
