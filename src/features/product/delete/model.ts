import { attach, createEvent, createStore, sample } from 'effector';
import { api } from '~/shared/api';
import { Product } from '~/shared/api/types/product';
import { createDisclosure } from '~/shared/lib/disclosure';

export const deleteTriggered = createEvent<Product>();
export const deleteConfirmed = createEvent();
export const mutated = createEvent();

export const disclosure = createDisclosure();
export const $product = createStore<Product | null>(null);

export const deleteProductFx = attach({
  source: $product,
  effect: async (product) => {
    if (!product?.id) {
      throw new Error('No id');
    }

    return api.product.delete(product.id);
  },
});
export const $pending = deleteProductFx.pending;

sample({
  clock: deleteTriggered,
  target: [$product, disclosure.opened],
});

sample({
  clock: deleteConfirmed,
  target: deleteProductFx,
});

sample({
  clock: deleteProductFx.doneData,
  target: [mutated, disclosure.closed],
});
