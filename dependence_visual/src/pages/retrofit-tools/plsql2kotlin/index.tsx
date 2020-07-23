import React, { useState } from "react";
import { Row, Col, Input, Button, notification } from "antd";
import CodemirrorCodeEditor from "./components/CodemirrorCodeEditor";

import { transformPlsqlToKotlin } from "@/api/addition/plsqlToKotlin.ts";

interface ValidateState {
  message: string;
  isValidate: boolean;
}

const PlsqlToKotlin = () => {
  const [plsqlCode, setPlsqlCode] = useState('')
  const [kotlinCode, setKotlinCode] = useState('')
  const [packageName, setPackageName] = useState('')

  const getValidateState = (): ValidateState => {
    if (!packageName) {
      return { isValidate: false, message: "包名不能为空" };
    }

    if (!plsqlCode) {
      return { isValidate: false, message: "PL/SQL code 不能为空" };
    }

    return { isValidate: true, message: "" };
  }

  const transformCode = () => {
    const validate = getValidateState()
    if (!validate.isValidate) {
      notification.warn({
        message: validate.message,
      });
      return;
    }
    transformPlsqlToKotlin(packageName, plsqlCode)
      .then((res: any) =>  { setKotlinCode(res) });
  }

  return (
    <div>
      <Input placeholder="包名" onChange={({ target: { value } }) => setPackageName(value)} />
      <Row style={{ marginTop: "16px" }}>
        <Col span={11}>
          <h3>PL/SQL code</h3>
          <CodemirrorCodeEditor
            language="sql"
            value={plsqlCode}
            onChange={(code: string) => setPlsqlCode(code)}
          />
        </Col>
        <Col span={2}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button type="primary" onClick={() => transformCode()}>
              转换
            </Button>
          </div>
        </Col>

        <Col span={11}>
          <h3>Kotlin Code</h3>
          <CodemirrorCodeEditor
            language="text/x-kotlin"
            value={kotlinCode}
            onChange={(code: string) => setKotlinCode(code)}
          />
        </Col>
      </Row>
    </div>
  )
}

export default PlsqlToKotlin;
