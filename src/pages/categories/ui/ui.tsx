import { LazyPageProps } from '~/shared/lib/lazy-page';

import { factory } from '../model';
import { Button, Flex, Table, theme, Typography } from 'antd';
import { useUnit } from 'effector-react';
import { CreateEditCategory, createEditCategoryModel } from '~/features/category/create-edit';
import { TableProps } from 'antd/lib';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Category } from '~/shared/api/types';
import { DeleteCategoryModal, deleteCategoryModel } from '~/features/category/delete';

type Model = ReturnType<typeof factory>;
type Props = LazyPageProps<Model>;

const useColumns = (): TableProps<Category>['columns'] => {
  const { token } = theme.useToken();
  return [
    {
      title: 'Название',
      dataIndex: 'name',
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      render: (description) => description || '-',
    },
    {
      title: '',
      width: '100px',
      render: (_, category) => (
        <Flex gap={token.marginXS} justify="end">
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => createEditCategoryModel.editTriggered(category)}
          />
          <Button
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteCategoryModel.deleteTriggered(category)}
          />
        </Flex>
      ),
    },
  ];
};

const CategoriesPage = ({ model }: Props) => {
  const [categories, pending] = useUnit([model.$categories, model.$pending]);
  const { token } = theme.useToken();
  const columns = useColumns();

  return (
    <Flex vertical>
      <Typography.Title level={2} style={{ margin: 0, padding: token.padding }}>
        Категории
      </Typography.Title>
      <Flex style={{ borderTop: `1px solid ${token.colorBorderSecondary}`, padding: token.padding }} justify="end">
        <CreateEditCategory />
      </Flex>
      <Table rowKey="id" style={{ width: '100%' }} columns={columns} dataSource={categories} loading={pending} />
      <DeleteCategoryModal />
    </Flex>
  );
};

export const component = CategoriesPage;
export const createModel = factory;
