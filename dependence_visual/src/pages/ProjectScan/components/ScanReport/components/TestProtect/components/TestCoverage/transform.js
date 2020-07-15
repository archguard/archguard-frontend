export function transformData(data) {
    const transformData = [
        {label: "Instruction Coverage", missed: data.instructionMissed, covered: data.instructionCovered},
        {label: "Line Coverage", missed: data.lineMissed, covered: data.lineCovered},
        {label: "Branch Coverage", missed: data.branchMissed, covered: data.branchCovered},
        {label: "Complexity Coverage", missed: data.complexityMissed, covered: data.complexityCovered},
        {label: "Method Coverage", missed: data.methodMissed, covered: data.methodCovered},
        {label: "Class Coverage", missed: data.classMissed, covered: data.classCovered},
    ]

    transformData.forEach(item => {
        item.percent = toPercent(item.missed, item.covered)
    })

    return transformData
}

function toPercent(missed, covered) {
  const point = covered / (missed + covered)
  const percent = Number(point * 100).toFixed() + "%"
  return percent
}