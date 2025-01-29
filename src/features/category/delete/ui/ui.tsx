import { DeleteOutlined } from '@ant-design/icons';
import { Button, Flex, Modal, theme, Typography } from 'antd';
import { useUnit } from 'effector-react';

import * as model from '../model';

export const DeleteCategoryModal: React.FC = () => {
  const [isOpen, pending, category] = useUnit([model.disclosure.$isOpen, model.$pending, model.$category]);
  const { token } = theme.useToken();
  return (
    <Modal
      width={420}
      open={isOpen}
      title="Удаление категории"
      onCancel={() => model.disclosure.closed()}
      footer={
        <Flex justify="end" gap={token.margin}>
          <Button onClick={() => model.disclosure.closed()}>Отменить</Button>
          <Button type="primary" danger onClick={() => model.deleteConfirmed()} loading={pending}>
            Удалить
          </Button>
        </Flex>
      }
    >
      <Typography.Text>
        Вы хотите удалить категорию <b>{category?.name}</b>?
      </Typography.Text>
    </Modal>
  );
};
