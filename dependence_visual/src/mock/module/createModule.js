import Mock from "mockjs";

const response = function(options) {
  return Mock.mock({id: "@id"})
};

export default response;
