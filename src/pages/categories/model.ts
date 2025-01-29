import { attach, createStore, sample } from 'effector';
import { userModel } from '~/entities/user';
import { createEditCategoryModel } from '~/features/category/create-edit';
import { deleteCategoryModel } from '~/features/category/delete';
import { api } from '~/shared/api';
import { Category } from '~/shared/api/types';
import { DEFAULT_PER_PAGE } from '~/shared/config/api';
import { LazyPageFactoryParams } from '~/shared/lib/lazy-page';
import { createPagination } from '~/shared/lib/pagination';

export const factory = ({ route }: LazyPageFactoryParams) => {
  const authorizedRoute = userModel.chainAuthorized({ route });

  const paginationModel = createPagination({ reset: [] });
  const $categories = createStore<Category[]>([]);

  const fetchCategoriesFx = attach({
    source: {
      page: paginationModel.$page,
    },
    effect: ({ page }) => {
      return api.category.getList({ params: { page, limit: DEFAULT_PER_PAGE } });
    },
  });
  const $pending = fetchCategoriesFx.pending;

  sample({
    clock: [
      authorizedRoute.opened,
      createEditCategoryModel.mutated,
      paginationModel.pageChanged,
      deleteCategoryModel.mutated,
    ],
    target: fetchCategoriesFx,
  });

  sample({
    clock: fetchCategoriesFx.doneData,
    fn: (response) => response.data.data,
    target: $categories,
  });

  sample({
    clock: [authorizedRoute.closed],
    target: $categories.reinit,
  });

  return { authorizedRoute, $categories, $pending };
};
