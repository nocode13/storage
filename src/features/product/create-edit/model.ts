import { attach, createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { or } from 'patronum';
import { CreateProductBody, EditProductBody } from '~/shared/api/types/api/product';
import { Product } from '~/shared/api/types/product';
import { createDisclosure } from '~/shared/lib/disclosure';

export const Gate = createGate<{ resetForm: () => void }>();

export const createTriggered = createEvent();
export const editTriggered = createEvent<Product>();
export const formSubmitted = createEvent<CreateProductBody>();
export const mutated = createEvent();
export const canceled = createEvent();

export const disclosure = createDisclosure();
export const $mode = createStore<'create' | 'edit'>('create');
export const $product = createStore<Product | null>(null);

const resetFormFx = attach({
  source: Gate.state,
  effect: ({ resetForm }) => resetForm(),
});

const createProductFx = createEffect(async (body: CreateProductBody) => {});
const editProductFx = attach({
  source: $product,
  effect: async (product, body: EditProductBody) => {},
});
export const $pending = or(createProductFx.pending, editProductFx.pending);

$mode.on(createTriggered, () => 'create').on(editTriggered, () => 'edit');

sample({
  clock: editTriggered,
  target: $product,
});

sample({
  clock: [createTriggered, editTriggered],
  target: [disclosure.opened],
});

sample({
  clock: formSubmitted,
  source: $mode,
  filter: (mode) => mode === 'create',
  fn: (_, body) => body,
  target: createProductFx,
});

sample({
  clock: formSubmitted,
  source: $mode,
  fn: (_, body) => body,
  filter: (mode) => mode === 'edit',
  target: editProductFx,
});

sample({
  clock: [createProductFx.doneData, editProductFx.doneData],
  target: [mutated, canceled],
});

sample({
  clock: canceled,
  target: [disclosure.closed, $product.reinit, resetFormFx],
});
