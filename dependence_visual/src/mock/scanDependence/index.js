import Mock from "mockjs";

import scanDependence from './scanDependence'

Mock.mock(/\/scanner\/dependency-analyses/, "post", scanDependence);
