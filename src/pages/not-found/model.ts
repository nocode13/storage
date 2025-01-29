import { createEvent, sample } from 'effector';

import { routes } from '~/shared/config/routing';
import { LazyPageFactoryParams } from '~/shared/lib/lazy-page';

export const factory = ({ route: _ }: LazyPageFactoryParams) => {
  const backToHomeClicked = createEvent();

  sample({
    clock: backToHomeClicked,
    target: routes.browse.open,
  });

  return {
    backToHomeClicked,
  };
};
