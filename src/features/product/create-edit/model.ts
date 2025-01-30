import { attach, createEffect, createEvent, createStore, sample, split } from 'effector';
import { or, spread } from 'patronum';
import { Product } from '~/shared/api/types/product';
import { createDisclosure } from '~/shared/lib/disclosure';
import * as z from 'zod';
import { createForm } from '~/shared/lib/create-form';
import { api } from '~/shared/api';
import { Category } from '~/shared/api/types';

export type FormValues = z.infer<typeof formSchema>;

export const formSchema = z.object({
  category_id: z
    .number()
    .nullable()
    .refine((value) => value !== null, 'Обязательное поле'),
  name: z.string().min(1, 'Обязательное поле'),
  type: z
    .string()
    .nullable()
    .refine((value) => value !== null, 'Обязательное поле'),
  description: z.string({ message: 'Обязательное поле' }).optional(),
});

export const createTriggered = createEvent();
export const editTriggered = createEvent<Product>();
export const formValidated = createEvent();
export const mutated = createEvent();
export const categorySelectOpened = createEvent();

export const form = createForm<FormValues>();

export const disclosure = createDisclosure();
export const $mode = createStore<'create' | 'edit'>('create');
export const $product = createStore<Product | null>(null);
export const $categories = createStore<Category[]>([]);

const fetchCategoriesFx = createEffect(() => {
  return api.category.getList({ params: { page: 1, limit: 5 } });
});
export const $categoriesPending = fetchCategoriesFx.pending;
const createProductFx = attach({
  source: {
    values: form.$formValues,
  },
  effect: async ({ values }) => {
    return api.product.create(values);
  },
});
const editProductFx = attach({
  source: {
    values: form.$formValues,
    product: $product,
  },
  effect: async ({ product, values }) => {
    if (!product) {
      throw new Error('No product');
    }
    api.product.edit(product.id, values);
  },
});
export const $pending = or(createProductFx.pending, editProductFx.pending);

$mode.on(createTriggered, () => 'create').on(editTriggered, () => 'edit');

sample({
  clock: editTriggered,
  fn: (product) => ({
    product,
    values: {
      name: product.name,
      type: product.type,
      description: product.description ?? undefined,
      category_id: product.category_id,
    },
  }),
  target: spread({
    targets: {
      product: $product,
      values: form.resetFx,
    },
  }),
});

sample({
  clock: [createTriggered, editTriggered],
  target: [disclosure.opened],
});

split({
  source: formValidated,
  match: $mode,
  cases: {
    create: createProductFx,
    edit: editProductFx,
  },
});

sample({
  clock: [createProductFx.doneData, editProductFx.doneData],
  target: [mutated, disclosure.closed],
});

sample({
  clock: [categorySelectOpened, editTriggered],
  source: $categories,
  filter: (categories) => !categories.length,
  target: fetchCategoriesFx,
});

sample({
  clock: fetchCategoriesFx.doneData,
  fn: (response) => response.data.data,
  target: $categories,
});

sample({
  clock: disclosure.closed,
  target: [
    $product.reinit,
    $categories.reinit,
    form.resetFx.prepend(() => ({
      category_id: null as unknown as number,
      name: '',
      description: undefined,
      type: null as unknown as string,
    })),
  ],
});
