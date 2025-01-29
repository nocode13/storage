import { attach, createEvent, createStore, sample } from 'effector';
import { api } from '~/shared/api';
import { Category } from '~/shared/api/types';
import { createDisclosure } from '~/shared/lib/disclosure';

export const deleteTriggered = createEvent<Category>();
export const deleteConfirmed = createEvent();
export const mutated = createEvent();

export const disclosure = createDisclosure();
export const $category = createStore<Category | null>(null);

export const deleteCategoryFx = attach({
  source: $category,
  effect: async (category) => {
    if (!category?.id) {
      throw new Error('No id');
    }

    return api.category.delete(category.id);
  },
});
export const $pending = deleteCategoryFx.pending;

sample({
  clock: deleteTriggered,
  target: [$category, disclosure.opened],
});

sample({
  clock: deleteConfirmed,
  target: deleteCategoryFx,
});

sample({
  clock: deleteCategoryFx.doneData,
  target: [mutated, disclosure.closed],
});
