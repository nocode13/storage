import { attach, createStore, sample } from 'effector';
import { userModel } from '~/entities/user';
import { api } from '~/shared/api';
import { Product } from '~/shared/api/types/product';
import { DEFAULT_PER_PAGE } from '~/shared/config/api';
import { LazyPageFactoryParams } from '~/shared/lib/lazy-page';
import { createPagination } from '~/shared/lib/pagination';

export const factory = ({ route }: LazyPageFactoryParams) => {
  const authorizedRoute = userModel.chainAuthorized({ route });

  const paginationModel = createPagination({ reset: [authorizedRoute.closed] });
  const $products = createStore<Product[]>([]);

  const fetchProductsFx = attach({
    source: {
      page: paginationModel.$page,
    },
    effect: async ({ page }) => {
      return api.product.getList({ params: { page, limit: DEFAULT_PER_PAGE } });
    },
  });
  const $pending = fetchProductsFx.pending;

  sample({
    clock: [authorizedRoute.opened, paginationModel.pageChanged],
    target: fetchProductsFx,
  });

  sample({
    clock: fetchProductsFx.doneData,
    fn: (response) => response.data.data,
    target: $products,
  });

  return { authorizedRoute, $pending, $products, paginationModel };
};
