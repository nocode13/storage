import { createHistoryRouter, createRoute, createRouterControls } from 'atomic-router';

export const routes = {
  browse: createRoute(),
  categories: {
    root: createRoute(),
    category: createRoute<{ id: string }>(),
  },

  auth: createRoute(),
  logOut: createRoute(),
  forbidden: createRoute(),

  notFound: createRoute(),
};

export const routesMap = [
  {
    route: routes.browse,
    path: '/',
  },
  {
    route: routes.auth,
    path: '/auth',
  },
  {
    route: routes.logOut,
    path: '/log-out',
  },
  {
    route: routes.forbidden,
    path: '/forbidden',
  },
  {
    route: routes.categories.root,
    path: '/categories',
  },
  {
    route: routes.categories.category,
    path: 'categories/:id',
  },
];

export const routerControls = createRouterControls();

export const router = createHistoryRouter({
  routes: routesMap,
  controls: routerControls,
  notFoundRoute: routes.notFound,
});
