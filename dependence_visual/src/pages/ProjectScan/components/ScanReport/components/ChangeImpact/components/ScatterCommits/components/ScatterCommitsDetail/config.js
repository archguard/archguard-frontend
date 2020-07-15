export const columns = [
  { title: "文件路径", dataIndex: "newPath" },
  { title: "认知复杂度", dataIndex: "cognitiveComplexity" },
  { title: "方式", dataIndex: "mode" },
  { title: "上一次提交ID", dataIndex: "prvsCmtId" },
  { title: "上一次提交认知复杂度", dataIndex: "prvsCgnCmplxty" }
];

export const commitLabelMap = {
  id: "提交ID",
  commitTime: "提交时间",
  committer: "提交者",
  shortMessage: "提交信息(short)"
};
