import React, { PureComponent } from 'react'
import { Input, Checkbox, Button, Form } from 'antd';
import { UserOutlined, LockOutlined, VerifiedOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { getCodeImg } from '../api/login';
import './login.css'

class LoginMain extends PureComponent {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         captcha_img: ''
    //     }
    // }

    // componentDidMount() {
    //     // componentWillMount在渲染过程中可能会执行多次
    //     console.info("============")
    //     this.getCaptcha()
    // }

    onFinish = (values) => {
        console.log('Success:', values);
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    getCaptcha = async () => {
        const res = await getCodeImg();
        if (res.status === 200) {
            return "data:image/gif;base64," + res.data.img
        }
        return ""
    }

    render() {
        let captcha_img = this.getCaptcha()
        return (
            <div className="login">
                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    autoComplete="off"
                >

                    <Form.Item
                        name="title"
                    >
                        <h3 className="title">若依后台管理系统</h3>
                    </Form.Item>
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input size="large" placeholder="用户名" prefix={<UserOutlined />} />
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

                    <Form.Item style={{ marginBottom: 0 }}>
                        <Form.Item
                            name="captcha_code"
                            rules={[{
                                required: true,
                                message: 'Please input your captcha!'
                            }]}
                            style={{ display: 'inline-block' }}
                        >
                            <Input size="large" placeholder="验证码" prefix={<VerifiedOutlined />} />
                        </Form.Item>
                        <Form.Item
                            name="captcha_img"
                            style={{ display: 'inline-block', margin: '0 8px' }}
                        >
                            <img src={captcha_img} style={{ width: '50%' }} alt="" />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item
                        name="remember"
                        valuePropName="checked">
                        <Checkbox>记住密码</Checkbox>
                    </Form.Item>

                    <Form.Item name='submit_login'>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default LoginMain