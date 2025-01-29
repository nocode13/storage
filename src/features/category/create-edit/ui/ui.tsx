import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, Modal, theme } from 'antd';

import * as model from '../model';
import { useGate, useUnit } from 'effector-react';
import { useId } from 'react';

export const CreateEditCategory: React.FC = () => {
  const [mode, isOpen, pending, category] = useUnit([
    model.$mode,
    model.disclosure.$isOpen,
    model.$pending,
    model.$category,
  ]);
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const formId = useId();
  useGate(model.Gate, {
    resetForm: form.resetFields,
  });

  const title = mode === 'create' ? 'Создание категории' : 'Изменение категории';
  return (
    <>
      <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => model.createTriggered()}>
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
          initialValues={mode === 'edit' ? { ...category } : undefined}
        >
          <Form.Item label="Название" name="name" rules={[{ required: true, message: 'Введите название!' }]}>
            <Input placeholder="Введите название" disabled={mode === 'edit'} />
          </Form.Item>

          <Form.Item label="Описание" name="description">
            <Input placeholder="Введите описание" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
