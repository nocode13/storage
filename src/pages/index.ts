import { createRoutesView } from 'atomic-router-react';

import { Forbidden } from './forbidden';
import { NotFound } from './not-found';
import { Auth } from './auth';
import { Browse } from './browse';
import { Categories } from './categories';
import { Products } from './products';

export const Routing = createRoutesView({
  routes: [Forbidden, NotFound, Auth, Browse, Categories, Products],
});
