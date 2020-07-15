import Mock from "mockjs";

import scanPlsql from './scanPlsql'

Mock.mock(/\/scanner\/sql-analyses/, "post", scanPlsql);
