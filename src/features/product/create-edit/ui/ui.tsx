import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Modal, theme } from 'antd';
import { useGate, useUnit } from 'effector-react';
import { useId } from 'react';
import * as model from '../model';

export const CreateEditProduct: React.FC = () => {
  const [isOpen, mode, pending, product] = useUnit([
    model.disclosure.$isOpen,
    model.$mode,
    model.$pending,
    model.$product,
  ]);
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const formId = useId();

  useGate(model.Gate, {
    resetForm: form.resetFields,
  });

  const title = mode === 'create' ? 'Создание продукта' : 'Изменение продукта';

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => model.createTriggered()}>
        Создать
      </Button>
      <Modal
        title={title}
        open={isOpen}
        onCancel={() => model.canceled()}
        footer={
          <Flex justify="end" gap={token.margin}>
            <Button onClick={() => model.canceled()}>Отменить</Button>
            <Button type="primary" htmlType="submit" form={formId} loading={pending}>
              {mode === 'create' ? 'Создать' : 'Изменить'}
            </Button>
          </Flex>
        }
      >
        <Form
          form={form}
          onFinish={model.formSubmitted}
          layout="vertical"
          id={formId}
          initialValues={mode === 'edit' ? { ...product } : undefined}
        ></Form>
      </Modal>
    </>
  );
};
