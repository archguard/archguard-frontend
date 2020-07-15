import queryString from "query-string";

const response = options => {
  const top = queryString.parseUrl(options.url).query.top;
  const response = [];
  for (var i = 0; i < top; i++) {
    response.push({
      path: i + '.file',
      count: 100 - i
    });
  }
  return response;
};

export default response;
