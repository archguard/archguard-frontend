import React, { useState } from "react";
import "./index.less";
import { Row, Col, Input, Button, Modal } from 'antd';
import { LoginOutlined, DoubleLeftOutlined } from '@ant-design/icons';

interface LoginProps {
    email: string;
    password: string
    setEmail(email: string): void;
    setPassword(password: string): void;
}

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onLoginClick = async () => {

    };

    const contactUs = async () => {
        Modal.info({
            title: '联系方式',
            content: (
                <div>
                    <br/>
                    <p><b>Email: </b>contact-cn@thoughtworks.com</p>
                    <p><b>Phone: </b>+86-010-56933060</p>
                </div>
            ),
            onOk() { },
        });
    }

    return (
        <div className="login-page">
            <Row className="content-row">
                {/* <Col xs={{ span: 1, offset: 0 }} lg={{ span: 1, offset: 0 }}></Col> */}
                <Col xs={{ span: 7, offset: 2 }} lg={{ span: 7, offset: 2 }}>
                    <div>
                        <img className="logo" src={require("../../assets/Logo.png")} alt="logo" />
                    </div>
                </Col>
                <Col xs={{ span: 11, offset: 2 }} lg={{ span: 9, offset: 3 }} className="right-box">
                    <div>
                        <p className="back-link">
                            <a href="/" className="grey-link"> <DoubleLeftOutlined /> 返回首页</a></p>
                        <h1 className="login-title">登 录</h1>

                        <div className="login-form">
                            <div className="login-info-row">
                                <div className="content">
                                    <Input
                                        placeholder="邮箱"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    ></Input>
                                </div>
                            </div>
                            <div className="login-info-row">
                                <div className="content">
                                    <Input
                                        placeholder="密码"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    ></Input>
                                </div>
                            </div>
                            <div className="forget-pwd-tips">
                                <p><a href="/reset-pwd">忘记密码？</a></p>
                            </div>
                            <div className="loginBtn">
                                <Button type="default" shape="round"
                                    icon={<LoginOutlined />} onClick={onLoginClick} >
                                    Login
                                </Button>
                            </div>
                            <div className="reg-tips">
                                <p>没有账号？<a href="/register" className="grey-link">立即注册</a></p>
                            </div>
                            <div className="contact-tips">
                                <Button type="link" className="grey-link" onClick={contactUs} >
                                    联系我们
                                </Button>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={{ span: 1, offset: 1 }} lg={{ span: 1, offset: 1 }}></Col>
            </Row>
        </div >
    );
}