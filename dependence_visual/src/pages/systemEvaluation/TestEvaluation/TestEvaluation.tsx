import React from "react";
import styles from "./TestEvaluation.less";

interface TestEvaluationProps {
  children?: React.ReactNode;
}

const TestEvaluation = (props: TestEvaluationProps) => {
  return <div className={ styles.TestEvaluation }>TestEvaluation</div>;
};

TestEvaluation.defaultProps = {};

export default TestEvaluation;
