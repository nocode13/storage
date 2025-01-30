import { LazyPageProps } from '~/shared/lib/lazy-page';

import { factory } from '../model';
import { Button, Flex, Table, TableProps, theme, Typography } from 'antd';
import { useUnit } from 'effector-react';
import { Product } from '~/shared/api/types/product';
import { EditOutlined } from '@ant-design/icons';
import { PAGE_SIZE_STEP } from '~/shared/config/api';
import { CreateEditProduct, createEditProductModel } from '~/features/product/create-edit';

type Model = ReturnType<typeof factory>;
type Props = LazyPageProps<Model>;

const useColumns = (): TableProps<Product>['columns'] => {
  return [
    {
      title: 'Название',
      dataIndex: 'name',
    },
    {
      title: '',
      width: '100px',
      render: (_, product) => (
        <Flex>
          <Button size="small" icon={<EditOutlined />} onClick={() => createEditProductModel.editTriggered(product)} />
        </Flex>
      ),
    },
  ];
};

const ProductsPage = ({ model }: Props) => {
  const [products, pending, total, page] = useUnit([
    model.$products,
    model.$pending,
    model.paginationModel.$total,
    model.paginationModel.$page,
  ]);
  const { token } = theme.useToken();
  const columns = useColumns();

  return (
    <Flex vertical style={{ height: '100%', overflowY: 'auto' }}>
      <Typography.Title level={2} style={{ margin: 0, padding: token.padding }}>
        Продукты
      </Typography.Title>
      <Flex style={{ borderTop: `1px solid ${token.colorBorderSecondary}`, padding: token.padding }} justify="end">
        <CreateEditProduct />
      </Flex>
      <Table
        rowKey="id"
        style={{ width: '100%' }}
        columns={columns}
        dataSource={products}
        loading={pending}
        pagination={
          total > PAGE_SIZE_STEP && {
            pageSize: PAGE_SIZE_STEP,
            current: page,
            showSizeChanger: false,
            total,
            onChange: (page) => model.paginationModel.pageChanged(page),
          }
        }
      />
    </Flex>
  );
};

export const component = ProductsPage;
export const createModel = factory;
