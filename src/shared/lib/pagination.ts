import { createEvent, createStore, Event, sample } from 'effector';

type Options = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reset?: Event<any> | Event<any>[];
};

export const createPagination = (options: Options) => {
  const pageChanged = createEvent<number>();

  const $page = createStore(1);
  const $total = createStore(1);

  $page.on(pageChanged, (_, page) => page);

  if (options.reset) {
    sample({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      clock: options.reset as Event<any>,
      target: [$page.reinit, $total.reinit],
    });
  }

  return {
    $page,
    $total,
    pageChanged,
  };
};
