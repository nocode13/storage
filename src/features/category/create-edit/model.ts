import { attach, createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { or } from 'patronum';
import { api } from '~/shared/api';
import { Category } from '~/shared/api/types';
import { CreateCategoryBody, EditCategoryBody } from '~/shared/api/types/api/category';
import { createDisclosure } from '~/shared/lib/disclosure';

export const Gate = createGate<{ resetForm: () => void }>();

export const createTriggered = createEvent();
export const editTriggered = createEvent<Category>();
export const formSubmitted = createEvent<CreateCategoryBody>();
export const mutated = createEvent();
export const canceled = createEvent();

export const disclosure = createDisclosure();
export const $mode = createStore<'create' | 'edit'>('create');
export const $category = createStore<Category | null>(null);

const resetFormFx = attach({
  source: Gate.state,
  effect: ({ resetForm }) => resetForm(),
});

const createCategoryFx = createEffect((body: CreateCategoryBody) => {
  const clonedBody = structuredClone(body);

  if (clonedBody.description === '') {
    delete clonedBody.description;
  }
  return api.category.create(clonedBody);
});

const editCategoryFx = attach({
  source: $category,
  effect: async (category, body: EditCategoryBody) => {
    if (!category) {
      throw new Error('No category');
    }

    return api.category.edit(category.id, { description: body.description });
  },
});

export const $pending = or(createCategoryFx.pending, editCategoryFx.pending);

$mode.on(createTriggered, () => 'create').on(editTriggered, () => 'edit');

sample({
  clock: editTriggered,
  target: $category,
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
  target: createCategoryFx,
});

sample({
  clock: formSubmitted,
  source: $mode,
  fn: (_, body) => body,
  filter: (mode) => mode === 'edit',
  target: editCategoryFx,
});

sample({
  clock: [createCategoryFx.doneData, editCategoryFx.doneData],
  target: [mutated, canceled],
});

sample({
  clock: canceled,
  target: [disclosure.closed, $category.reinit, resetFormFx],
});
