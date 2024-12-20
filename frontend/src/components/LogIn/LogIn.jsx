import React, { useState } from "react";
import { Form, Input, Button, Typography, Card, message } from "antd";

const { Title } = Typography;

const LogIn = ({onLoginSuccess}) => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onFinish = async (values) => {
        setLoading(true);
        setErrorMessage("");  
        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    username: values.username,
                    password: values.password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 400) {
                    setErrorMessage("Invalid username or password.");
                } else {
                    setErrorMessage(errorData.detail || "Something went wrong.");
                }
                throw new Error(errorData.detail || "Invalid credentials.");
            }

            const data = await response.json();
            message.success("Login successful!");
            console.log("Access Token:", data.access_token);
            onLoginSuccess()
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#f0f2f5",
            }}
        >
            <Card
                style={{
                    width: 400,
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    borderRadius: "8px",
                }}
            >
                <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
                    Login
                </Title>

                <Form
                    name="login"
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: "Please input your username!" }]}
                    >
                        <Input placeholder="Enter your username" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Please input your password!" }]}
                    >
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>
                {errorMessage && (
                    <div style={{ marginBottom: "20px", color: "red", textAlign: "center" }}>
                        {errorMessage}
                    </div>
                )}
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            block
                            style={{ borderRadius: "5px" }}
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default LogIn;
