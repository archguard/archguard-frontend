import { queryModuleCoupling } from "@/api/module/module";
import CollapsibleCard from "@/components/CollapsibleCard";
import QuestionCircleOutlined from "@ant-design/icons/lib/icons/QuestionCircleOutlined";
import { Button } from "antd";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import useModuleCoupling from "../../globalStates/useModuleCoupling";
import Report from "./report";

function ModuleCouplingTable() {
  const [moduleCoupling, setModuleCoupling] = useModuleCoupling();

  function showAllModuleCoupling() {
    queryModuleCoupling().then((res) => {
      setModuleCoupling(res);
    });
  }

  return (
    <CollapsibleCard
      title={
        <Fragment>
          模块耦合度
          <Link
            to={{
              pathname: "/help/module-coupling",
            }}
            target="_blank"
          >
            {" "}
            <QuestionCircleOutlined />
          </Link>
        </Fragment>
      }
      collapsed={true}
    >
      <div>
        <Button
          type="primary"
          onClick={() => showAllModuleCoupling()}
          style={{ marginBottom: "16px" }}
        >
          查询
        </Button>
        {moduleCoupling!.length > 0 && <Report data={moduleCoupling as any} />}
      </div>
    </CollapsibleCard>
  );
}

export default ModuleCouplingTable;
