const response = {
  nodes: [
    {
      id: 1,
      name: "code-analysis-scanner"
    },
    {
      id: 2,
      name: "code-analysis-addition"
    },
    {
      id: 3,
      name: "code-analysis-addition"
    },
    {
      id: 4,
      name: "code-analysis-addition"
    },
  ],
  edges: [
    {
      a: 1,
      b: 2,
      num: 10
    },
    {
      a: 1,
      b: 3,
      num: 10
    },
    {
      a: 1,
      b: 4,
      num: 10
    },
    {
      a: 2,
      b: 4,
      num: 10
    }
  ]
};

export default response;
