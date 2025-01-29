import { LazyPageProps } from '~/shared/lib/lazy-page';

import { factory } from '../model';

type Model = ReturnType<typeof factory>;
type Props = LazyPageProps<Model>;

const NotFoundPage = (_: Props) => {
  return 'not found'
};

export const component = NotFoundPage;
export const createModel = factory;
