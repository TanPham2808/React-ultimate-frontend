import { ArrowRightOutlined } from "@ant-design/icons";
import { Form, Row, Col, Input, Button, Divider, message, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../services/api.services";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";

const LoginPage = () => {

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [isLoad, setIsLoad] = useState(false);

    // Triển khai useContext
    const { setUser } = useContext(AuthContext);

    const onFinish = async (values) => {
        setIsLoad(true);
        const res = await loginAPI(values.email, values.password);
        if (res.data) {
            setIsLoad(false);
            // Lưu token vào localStorage
            localStorage.setItem("access_token", res.data.access_token);

            // Cập nhật thông tin user vào useContext()
            setUser(res.data.user);

            navigate("/");
        } else {
            notification.error({
                message: "Error login",
                description: JSON.stringify(res.message)
            })
        }
        setIsLoad(false);
    }

    return (
        <Row justify={"center"} style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{
                    padding: "15px",
                    margin: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px"
                }}>
                    <legend>Đăng Nhập</legend>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Email không được để trống!',
                                },
                                {
                                    type: "email",
                                    message: 'Email không đúng định dạng!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Password không được để trống!',
                                },
                            ]}
                        >
                            <Input.Password
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') form.submit()
                                }}
                            />
                        </Form.Item>

                        <Form.Item >
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <Button
                                    loading={isLoad}
                                    type="primary"
                                    onClick={() => form.submit()}>
                                    Login
                                </Button>
                                <Link to="/">Go to homepage <ArrowRightOutlined /></Link>
                            </div>
                        </Form.Item>
                    </Form>
                    <Divider />
                    <div style={{ textAlign: "center" }}>
                        Chưa có tài khoản? <Link to={"/register"}>Đăng ký tại đây</Link>
                    </div>
                </fieldset>
            </Col>
        </Row>

    )
}

export default LoginPage;