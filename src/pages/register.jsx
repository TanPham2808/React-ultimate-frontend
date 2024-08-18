import { Input, Button, Form, notification, Row, Col, Divider } from 'antd';
import { registerUserAPI } from '../services/api.services';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const res = await registerUserAPI(
            values.fullName,
            values.email,
            values.password,
            values.phone);
        if (res.data) {
            notification.success({
                message: "Register user",
                description: "Đăng ký người dùng thành công"
            })

            // Redirect page về login
            navigate("/login");
        } else {
            notification.error({
                message: "Register user error",
                description: JSON.stringify(res.message)
            })
        }
    }

    return (
        <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            style={{ margin: "30px" }}
        // onFinishFailed={onFinishFailed}
        >
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your full name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                pattern: new RegExp(/\d+/g),
                                message: "Only input number!"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <div >
                        <Button onClick={() => form.submit()}
                            type="primary">Register
                        </Button>

                        {/* <Button onClick={() => {
                        // Set giá trị cho input email
                        form.setFieldsValue({
                            email: "hoitanpham@gmail.com",
                            fullName: "aaa"
                        })

                        // Lấy hết data ra
                        //form.getFieldsValue()
                    }}
                        type="primary">Test
                    </Button> */}
                    </div>
                    <Divider />
                    <div>
                        Đã có tài khoản? <Link to="/login">Đăng nhập tại đây</Link>
                    </div>
                </Col>
            </Row>
        </Form >
    )
}

export default RegisterPage;