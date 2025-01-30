import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Flex, Input, Modal, Select, theme } from 'antd';
import { useUnit } from 'effector-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useId } from 'react';
import * as model from '../model';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { FieldWrapper } from '~/shared/ui/field-wrapper';
import { productConfig } from '~/entities/product';

export const CreateEditProduct: React.FC = () => {
  const [isOpen, mode, pending, product, categories, categoriesPending] = useUnit([
    model.disclosure.$isOpen,
    model.$mode,
    model.$pending,
    model.$product,
    model.$categories,
    model.$categoriesPending,
  ]);
  const { token } = theme.useToken();
  const form = useForm<model.FormValues>({
    resolver: zodResolver(model.formSchema),
  });
  model.form.useBindFormWithModel({ form });
  const formId = useId();
  const productTypeOptions = productConfig.useProductTypeOptions();

  const title = mode === 'create' ? 'Создание продукта' : 'Изменение продукта';

  return (
    <>
      <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => model.createTriggered()}>
        Создать
      </Button>
      <Modal
        title={title}
        open={isOpen}
        onCancel={() => model.disclosure.closed()}
        footer={
          <Flex justify="end" gap={token.margin}>
            <Button onClick={() => model.disclosure.closed()}>Отменить</Button>
            <Button type="primary" htmlType="submit" form={formId} loading={pending}>
              {mode === 'create' ? 'Создать' : 'Изменить'}
            </Button>
          </Flex>
        }
      >
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(() => model.formValidated())} id={formId}>
            <Flex vertical gap={token.margin} style={{ marginBottom: token.marginXL }}>
              <Controller
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FieldWrapper label="Название" isError={!!form.formState.errors['name']?.message}>
                    <Input value={field.value} onChange={(value) => field.onChange(value.target.value)} />
                  </FieldWrapper>
                )}
              />
              <Controller
                control={form.control}
                name="category_id"
                render={({ field }) => (
                  <FieldWrapper label="Категория" isError={!!form.formState.errors['category_id']?.message}>
                    <Select
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                      onDropdownVisibleChange={(open) => open && model.categorySelectOpened()}
                      options={categories}
                      fieldNames={{ label: 'name', value: 'id' }}
                      loading={categoriesPending}
                    />
                  </FieldWrapper>
                )}
              />
              <Controller
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FieldWrapper label="Тип" isError={!!form.formState.errors['type']?.message}>
                    <Select
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                      options={productTypeOptions}
                    />
                  </FieldWrapper>
                )}
              />
              <Controller
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FieldWrapper label="Описание" isError={!!form.formState.errors['description']?.message}>
                    <Input value={field.value} onChange={(value) => field.onChange(value.target.value)} />
                  </FieldWrapper>
                )}
              />
            </Flex>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};
