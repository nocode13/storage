import { LazyPageProps } from '~/shared/lib/lazy-page';

import { factory } from '../model';

type Model = ReturnType<typeof factory>;
type Props = LazyPageProps<Model>;


const ForbiddenPage = (_: Props) => {
  return 'forbidden';
};

export const component = ForbiddenPage;
export const createModel = factory;
