import Mock from "mockjs";
import queryModule from "./queryModule";
import createModule from "./createModule";
import deleteModule from "./deleteModule";
import updateModule from "./updateModule";

const url = /\/modules/

Mock.mock(url, "get", queryModule);
Mock.mock(url, "post", createModule);
Mock.mock(url, "delete", deleteModule);
Mock.mock(url, "put", updateModule);

console.log('mock module')
