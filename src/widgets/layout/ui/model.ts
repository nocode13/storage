import { combine, createEffect, createEvent, sample, split } from 'effector';
import { routes } from '~/shared/config/routing';

export const menuChanged = createEvent<string>();

export const redirectFx = createEffect((key: string) => {
  switch (key) {
    case 'categories':
      routes.categories.open();
      break;
    case 'products':
      routes.products.open();
      break;
  }
});

export const $activeMenu = combine(
  { categories: routes.categories.$isOpened, products: routes.products.$isOpened },
  ({ categories, products }) => {
    if (categories) {
      return 'categories';
    }

    if (products) {
      return 'products';
    }

    return null;
  },
);

sample({
  clock: menuChanged,
  target: redirectFx,
});
