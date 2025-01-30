import { createHistoryRouter, createRoute, createRouterControls } from 'atomic-router';

export const routes = {
  browse: createRoute(),
  categories: createRoute(),
  products: createRoute(),

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
    route: routes.categories,
    path: '/categories',
  },
  {
    route: routes.products,
    path: '/products',
  },
];

export const routerControls = createRouterControls();

export const router = createHistoryRouter({
  routes: routesMap,
  controls: routerControls,
  notFoundRoute: routes.notFound,
});
