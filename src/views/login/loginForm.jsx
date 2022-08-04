import React, { PureComponent } from 'react'
import { Input, Checkbox, Button, Form, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, VerifiedOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { getCodeImg } from '../../api/login';
import './login.css'

class LoginForm extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            captcha_img: ''
        }
    }

    componentDidMount() {
        // componentWillMount在渲染过程中可能会执行多次
        console.info("============")
        this.getCaptcha()
    }

    toggleForm = () => {
        this.props.sc('register')
    }

    onFinish = (values) => {
        console.log('Success:', values);
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    getCaptcha = async () => {
        const res = await getCodeImg();
        if (res.status === 200) {
            this.setState({ captcha_img: "data:image/gif;base64," + res.data.img })
        }
    }

    render() {
        return (
            <div className="login_form">
                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    autoComplete="off"
                >
                    <h3 className="title">若依后台管理系统</h3>
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input placeholder="用户名" prefix={<UserOutlined />} />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password placeholder="密码" prefix={<LockOutlined />} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                    </Form.Item>
                    <Form.Item >
                        <Row gutter={8}>
                            <Col span={16}>
                                <Form.Item
                                    name="captcha"
                                    noStyle
                                    rules={[{ required: true, message: 'Please input the captcha you got!' }]}
                                >
                                    <Input placeholder="验证码" prefix={<VerifiedOutlined />} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <img src={this.state.captcha_img} style={{ width: '90px', height: '32px' }} alt='' onClick={this.getCaptcha} />
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 0, span: 8 }}
                    >
                        <Checkbox>记住密码</Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Row gutter={8}>
                            <Col span={16}>
                                <Form.Item name='submit_login' wrapperCol={{ offset: 0, span: 6 }}>
                                    <Button type="primary" htmlType="submit">
                                        登录
                                    </Button>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name='submit_login' wrapperCol={{ offset: 0, span: 6 }}>
                                    <Button type="primary" onClick={this.toggleForm}>
                                        注册
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>


                    </Form.Item>

                </Form>
            </div>
        )
    }
}

export default LoginForm