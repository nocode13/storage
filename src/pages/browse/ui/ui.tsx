import { LazyPageProps } from '~/shared/lib/lazy-page';

import { factory } from '../model';

type Model = ReturnType<typeof factory>;
type Props = LazyPageProps<Model>;

const BrowsePage = (_: Props) => {
  return null;
};

export const component = BrowsePage;
export const createModel = factory;
