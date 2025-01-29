import { createRoutesView } from 'atomic-router-react';

import { Forbidden } from './forbidden';
import { NotFound } from './not-found';

export const Routing = createRoutesView({
  routes: [Forbidden, NotFound],
});
