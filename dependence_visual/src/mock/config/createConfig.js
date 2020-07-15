import Mock from "mockjs";

const response = function(options) {
  return Mock.mock({ success: true, message: "Add a new config", id: "@id" });
};

export default response;
