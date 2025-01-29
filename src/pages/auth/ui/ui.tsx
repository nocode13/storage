import { LazyPageProps } from '~/shared/lib/lazy-page';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { factory } from '../model';
import { Form, Input, Flex, Checkbox, Button, Typography } from 'antd';

type Model = ReturnType<typeof factory>;
type Props = LazyPageProps<Model>;

const AuthPage = ({ model }: Props) => {
  return (
    <Flex align="center" justify="center" vertical style={{ height: '100%' }}>
      <Typography.Title level={2}>Log in</Typography.Title>
      <Form
        name="login"
        style={{ maxWidth: 360 }}
        onFinish={(values) => model.loginFx({ username: values.username, password: values.password })}
      >
        <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
          {/* or <a href="">Register now!</a> */}
        </Form.Item>
      </Form>
    </Flex>
  );
};

export const component = AuthPage;
export const createModel = factory;
