// src/pages/LoginPage/index.tsx
import React, { useState } from 'react';
import { Form, Input, Button, Typography, Space, Card } from 'antd';
import { login } from '../../api';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const role = await login(values.username, values.password);
      console.log('Logged in as:', role);
      // 设置角色并跳转到列表页
      localStorage.setItem('role', role);
      navigate('/list');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
      <Card title="Login" style={{ width: 300, borderRadius: 8, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Form name="login" initialValues={{ remember: true }} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Login
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;