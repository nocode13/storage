import dayjs from 'dayjs';
import { createEffect, sample } from 'effector';
import { createBrowserHistory } from 'history';
import ru from 'dayjs/locale/ru';

import { router } from '~/shared/config/routing';
import { appStarted } from '~/shared/config/system';

dayjs.locale(ru);

const createBrowserHistoryFx = createEffect(() => createBrowserHistory());

sample({
  clock: appStarted,
  target: createBrowserHistoryFx,
});

sample({
  clock: createBrowserHistoryFx.doneData,
  target: router.setHistory,
});
