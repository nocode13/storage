import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';
import { Menu, theme, Layout as AntLayout } from 'antd';
import { Header, Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { token } = theme.useToken();

  return (
    <AntLayout style={{ height: 'inherit' }}>
      <Sider>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <AntLayout>
        <Header style={{ padding: 0, background: token.colorBgContainer }}></Header>
        <Content
          style={{
            margin: '24px 16px',
            minHeight: 280,
            background: token.colorBgContainer,
            borderRadius: token.borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  );
};
