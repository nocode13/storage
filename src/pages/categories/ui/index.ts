import { routes } from '~/shared/config/routing';
import { createLazyPage } from '~/shared/lib/lazy-page';
import { withSuspense } from '~/shared/ui/with-suspense';
import { Layout } from '~/widgets/layout';

const load = () => import('./ui');

const route = routes.categories.root;

const Page = createLazyPage({
  route,
  load,
});

export const Categories = {
  route,
  view: withSuspense(Page),
  layout: Layout,
};
