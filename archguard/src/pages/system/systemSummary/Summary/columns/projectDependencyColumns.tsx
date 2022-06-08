export const projectDependencyColumns = [
  {
    title: "Tools",
    dataIndex: "packageManager",
    key: "packageManager",
    filters: [
      {
        text: "gradle",
        value: "gradle",
      },
      {
        text: "maven",
        value: "maven",
      },
      {
        text: "npm",
        value: "npm",
      },
    ],
    onFilter: (value: string, record) => record.packageManager.indexOf(value) === 0,
    sorter: (a, b) => a.packageManager.length - b.packageManager.length,
  },
  {
    title: "Group",
    dataIndex: "depGroup",
    key: "depGroup",
    sorter: (a, b) => a.depGroup.length - b.depGroup.length,
  },
  {
    title: "dep artifact",
    dataIndex: "depArtifact",
    key: "depArtifact",
    sorter: (a, b) => a.depArtifact.length - b.depArtifact.length,
  },
  {
    title: "Scope",
    dataIndex: "depScope",
    key: "depScope",
    filters: [
      {
        text: "NORMAL",
        value: "NORMAL",
      },
      {
        text: "RUNTIME",
        value: "RUNTIME",
      },
      {
        text: "TEST",
        value: "TEST",
      },
      {
        text: "OPTIONAL",
        value: "OPTIONAL",
      },
      {
        text: "DEV",
        value: "DEV",
      },
    ],
    onFilter: (value: string, record) => record.depScope.indexOf(value) === 0,
    sorter: (a, b) => a.depScope.length - b.depScope.length,
  },
  {
    title: "Version",
    dataIndex: "depVersion",
    key: "depVersion",
    sorter: (a, b) => a.depVersion.length - b.depVersion.length,
  },
];
