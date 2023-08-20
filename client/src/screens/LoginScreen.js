import { Button, Card, Form, Input, message } from "antd";
import { useRef } from "react";
import axios from 'axios';

const LoginScreen = () => {

    const formRef = useRef();

    const handleRegister = async (values) => {
        const { username, password, rePassword } = values;

        if (password !== rePassword) {
            return message.error("Mật khẩu không trùng khớp.")
        } 
            const api = `http://localhost:3001/api/v1/users/register`;

            try {
                const res = await axios({
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: api,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: { username, password },
                });
                console.log(username, password);

                if (res && res.status === 200 && res.data) {
                    const accessToken = res.data.token;

                    localStorage.setItem('accessToken', accessToken)
                }
            } catch (error) {
                console.log(error);
        }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-8 offset-2">
                    <Card title='Register'>
                        <Form layout='vertical' ref={formRef} onFinish={handleRegister}>
                            <Form.Item
                                name={'username'}
                                label='User name'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui long nhap username!'
                                    }
                                ]}>
                                <Input max={20} showCount allowClear placeholder="username" />
                            </Form.Item>
                            <Form.Item
                                name={'password'}
                                label='Password'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui long nhap password!'
                                    }
                                ]}>
                                <Input.Password max={20} min={6} placeholder="password" />
                            </Form.Item>
                            <Form.Item
                                name={'rePassword'}
                                label='Confirm Password'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui long nhap lai password!'
                                    }
                                ]}>
                                <Input.Password max={20} min={6} placeholder="password" />
                            </Form.Item>
                        </Form>
                        <div className="text-center">
                            <Button type="primary" onClick={() => formRef.current.submit()}>Register</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen;