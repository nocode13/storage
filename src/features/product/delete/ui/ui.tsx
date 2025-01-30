import { theme, Modal, Flex, Button, Typography } from 'antd';
import { useUnit } from 'effector-react';
import * as model from '../model';

export const DeleteProductModal: React.FC = () => {
  const [isOpen, pending, product] = useUnit([model.disclosure.$isOpen, model.$pending, model.$product]);
  const { token } = theme.useToken();
  return (
    <Modal
      width={420}
      open={isOpen}
      title="Удаление продукта"
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
        Вы хотите удалить категорию <b>{product?.name}</b>?
      </Typography.Text>
    </Modal>
  );
};
