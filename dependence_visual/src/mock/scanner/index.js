import Mock from "mockjs";

import scanProject from "./scanProject";
import queryScannerConfig from "./queryScannerConfig";
import updateScannerConfig from "./updateScannerConfig";

Mock.mock(/\/scanner\/reports/, "post", scanProject);
Mock.mock(/\/scanner\/config/, "get", queryScannerConfig);
Mock.mock(/\/scanner\/config/, "put", updateScannerConfig);
