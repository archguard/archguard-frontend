export const itemMap = {
  linesCoverage: {
    header: "行覆盖率",
    renderItem: item => (
      <p>
        {item.scope.start}%-{item.scope.end || 100}%：
        <strong>{item.count}</strong>
        个文件
      </p>
    )
  },
  branchesCoverage: {
    header: "分支覆盖率",
    renderItem: item => (
      <p>
        {item.scope.start}%-{item.scope.end || 100}%：
        <strong>{item.count}</strong>
        个文件
      </p>
    )
  },
  cycleComplexity: {
    header: "圈复杂度",
    renderItem: item => <p>{item}</p>
  }
};
