import { ProductOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Menu, theme, Layout as AntLayout, Typography, Flex } from 'antd';
import { Header, Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { useUnit } from 'effector-react';

import * as model from './model';

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { token } = theme.useToken();
  const [activeMenu] = useUnit([model.$activeMenu]);

  return (
    <AntLayout style={{ height: 'inherit' }}>
      <Sider>
        <Flex vertical align="center">
          <Typography.Title style={{ color: 'white' }}>Storage</Typography.Title>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={activeMenu ? [activeMenu] : []}
            onClick={(info) => model.menuChanged(info.key)}
            items={[
              {
                key: 'categories',
                icon: <UnorderedListOutlined />,
                label: 'Категории',
              },
              {
                key: 'products',
                icon: <ProductOutlined />,
                label: 'Продукты',
              },
            ]}
          />
        </Flex>
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
