const response = {
  nodes: [
    {
      id: "123d27ee-93bd-4b61-a8c7-efb79d7a797e",
      title:
        "evolution.dependence.application.fix.FixMethodDuplicate$FixRepository.deleteOne",
      properties: { callers: "2", callees: "4" }
    },
    {
      id: "99915bab-98e1-442f-94ca-09ce949a0c35",
      title: "org.skife.jdbi.v2.Handle.execute",
      properties: { callers: "5" }
    },
    {
      id: "b2d0c0bf-4415-44bc-b887-be8ccfbaf5ba",
      title: "org.skife.jdbi.v2.DBI.open",
      properties: { callers: "9" }
    },
    {
      id: "690b0c39-ced8-4f0d-96d1-586e9437ebf6",
      title: "java.lang.String.format",
      properties: { callers: "13" }
    },
    {
      id: "b2a7ad80-8bd7-4414-8549-7cc701a23a17",
      title: "org.skife.jdbi.v2.Handle.close",
      properties: { callers: "6" }
    }
  ],
  edges: [
    {
      a: "123d27ee-93bd-4b61-a8c7-efb79d7a797e",
      b: "99915bab-98e1-442f-94ca-09ce949a0c35",
      labels: []
    },
    {
      a: "123d27ee-93bd-4b61-a8c7-efb79d7a797e",
      b: "b2d0c0bf-4415-44bc-b887-be8ccfbaf5ba",
      labels: []
    },
    {
      a: "123d27ee-93bd-4b61-a8c7-efb79d7a797e",
      b: "690b0c39-ced8-4f0d-96d1-586e9437ebf6",
      labels: []
    },
    {
      a: "123d27ee-93bd-4b61-a8c7-efb79d7a797e",
      b: "b2a7ad80-8bd7-4414-8549-7cc701a23a17",
      labels: []
    }
  ]
};

export default response
