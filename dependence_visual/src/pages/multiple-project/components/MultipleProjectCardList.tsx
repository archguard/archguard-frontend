import React from 'react'
import { Card, Col, Row } from 'antd'
import Meta from 'antd/lib/card/Meta'
import { PlusOutlined } from '@ant-design/icons'

interface MultipleProjectCardListProps {
  editable?: boolean
}

const MultipleProjectCardList = (props: MultipleProjectCardListProps) => {
  const { editable } = props
  const list = ['', '', '', '', '', '', '', '', '', '', '', '', '', '']

  return (
    <Row gutter={[12, 12]}>
      { editable &&
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <Card hoverable>
            <div className="multiple-project-card-content add">
              <PlusOutlined />
            </div>
            <div className="multiple-project-card-title">
              <span>新增项目</span>
            </div>
          </Card>
        </Col>
      }
      {list.map(() => (
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <Card hoverable>
            <div className="multiple-project-card-content">
              <img
                style={{ margin: '70px 0', width: '180px' }}
                src={require('@/assets/project-example.png')}
                alt="example" />
            </div>
            <Meta title="ArchGuard项目" description="简介：架构守护" />
          </Card>
        </Col>
      ))}
    </Row>
  )
}
export default MultipleProjectCardList
