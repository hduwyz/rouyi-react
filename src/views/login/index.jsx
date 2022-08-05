import React, { PureComponent } from 'react'
import LoginForm from './loginForm'
import RegisterForm from './registerForm'

export default class Login extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            formType: "login"
        }
    }

    switchForm = (value) => {
        this.setState({
            formType: value
        })
    }
    render() {
        return (
            <div className="login">
                {
                    this.state.formType === 'login'
                        ? <LoginForm sc={this.switchForm}></LoginForm>
                        : <RegisterForm sc={this.switchForm}></RegisterForm>
                }
            </div>
        )
    }
}