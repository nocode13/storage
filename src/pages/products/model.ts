import { attach, createStore, sample } from 'effector';
import { spread } from 'patronum';
import { userModel } from '~/entities/user';
import { createEditProductModel } from '~/features/product/create-edit';
import { deleteProductModel } from '~/features/product/delete';
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
    clock: [
      authorizedRoute.opened,
      paginationModel.pageChanged,
      createEditProductModel.mutated,
      deleteProductModel.mutated,
    ],
    target: fetchProductsFx,
  });

  sample({
    clock: fetchProductsFx.doneData,
    fn: (response) => ({
      products: response.data.data,
      total: response.data.total,
    }),
    target: spread({
      targets: {
        products: $products,
        total: paginationModel.$total,
      },
    }),
  });

  return { authorizedRoute, $pending, $products, paginationModel };
};
