import React, { PureComponent } from 'react'
import { Input, Checkbox, Button, Form, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, VerifiedOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { getCodeImg, login } from '../../api/login';
import './login.css'

class LoginForm extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            captcha_img: '',
            remember: true,
            uuid: ''
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

    onFinish = async (values) => {
        let uuid = this.state.uuid
        const res = await login(values.username, values.password, values.captcha, uuid);
        console.info(res)
        if (res.status === 200 && res.data.code === 200) {
            alert("登录成功")
            this.$router.push({ path: '/home' })
        }
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    getCaptcha = async () => {
        const res = await getCodeImg();
        if (res.status === 200) {
            this.setState({
                captcha_img: "data:image/gif;base64," + res.data.img,
                uuid: res.data.uuid
            })
        }
    }

    getChecked = () => {
        let value = !this.state.remember
        console.log(value)
        this.setState({
            remember: value
        })
    }

    render() {


        return (
            <div className="login_form">
                <Form
                    name="basic"
                    initialValues={
                        {
                            username: 'admin',
                            password: 'admin123',
                            captcha: '',
                            remember: this.state.remember
                        }
                    }
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    autoComplete="off"
                >
                    <h3 className="title">若依后台管理系统</h3>
                    <Form.Item
                        name="username"
                        valuePropName="defaultValue"
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
                        <Checkbox onChange={this.getChecked}>记住密码</Checkbox>
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
                                <Form.Item name='submit_register' wrapperCol={{ offset: 0, span: 6 }}>
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