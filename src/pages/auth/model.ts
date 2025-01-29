import { redirect } from 'atomic-router';
import { createEffect, sample } from 'effector';
import { spread } from 'patronum';
import { userModel } from '~/entities/user';
import { api } from '~/shared/api';
import { routes } from '~/shared/config/routing';
import { authStorageService } from '~/shared/lib/auth-storage';
import { LazyPageFactoryParams } from '~/shared/lib/lazy-page';

export const factory = ({ route }: LazyPageFactoryParams) => {
  const authorizedRoute = userModel.chainAnonymous({ route });

  const loginFx = createEffect(api.auth.login);
  const setTokenFx = createEffect(authStorageService.setAccessToken);

  sample({
    clock: loginFx.doneData,
    fn: (response) => response.data,
    target: spread({
      targets: {
        access_token: setTokenFx,
        user: userModel.loggedIn,
      },
    }),
  });

  redirect({
    clock: loginFx.doneData,
    replace: true,
    route: routes.browse,
  });

  return { authorizedRoute, loginFx };
};
