import { redirect } from 'atomic-router';
import { userModel } from '~/entities/user';
import { routes } from '~/shared/config/routing';
import { LazyPageFactoryParams } from '~/shared/lib/lazy-page';

export const factory = ({ route }: LazyPageFactoryParams) => {
  const authorizedRoute = userModel.chainAuthorized({ route });

  redirect({
    clock: authorizedRoute.opened,
    route: routes.categories,
  });

  return { authorizedRoute };
};
