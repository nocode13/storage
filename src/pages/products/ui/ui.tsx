import { LazyPageProps } from '~/shared/lib/lazy-page';

import { factory } from '../model';
import { Button, Flex, Table, TableProps, theme, Typography } from 'antd';
import { useUnit } from 'effector-react';
import { Product } from '~/shared/api/types/product';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { PAGE_SIZE_STEP } from '~/shared/config/api';
import { CreateEditProduct, createEditProductModel } from '~/features/product/create-edit';
import { productConfig } from '~/entities/product';
import { DeleteProductModal, deleteProductModel } from '~/features/product/delete';

type Model = ReturnType<typeof factory>;
type Props = LazyPageProps<Model>;

const useColumns = (): TableProps<Product>['columns'] => {
  const { token } = theme.useToken();
  return [
    {
      title: 'Название',
      dataIndex: 'name',
    },
    {
      title: 'Тип',
      dataIndex: 'type',
      render: (type: Product['type']) => productConfig.productTypeOptions[type].label,
    },
    {
      title: '',
      width: '100px',
      render: (_, product) => (
        <Flex gap={token.marginXS} justify="end">
          <Button size="small" icon={<EditOutlined />} onClick={() => createEditProductModel.editTriggered(product)} />
          <Button
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteProductModel.deleteTriggered(product)}
          />
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
      <DeleteProductModal />
    </Flex>
  );
};

export const component = ProductsPage;
export const createModel = factory;
