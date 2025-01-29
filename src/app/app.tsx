import { RouterProvider } from 'atomic-router-react';
import { useStoreMap } from 'effector-react';

import { Routing } from '~/pages';
import { userModel } from '~/entities/user';
import { router } from '~/shared/config/routing';
import { ConfigProvider, Spin } from 'antd';
import ruRU from 'antd/locale/ru_RU';

import { GlobalStyle } from './global-style';

import './model';
import { appStarted } from '~/shared/config/system';

appStarted();

export const App = () => {
  const isFetchingSession = useStoreMap(userModel.$session, (session) => session === userModel.SessionStatus.Pending);

  return (
    <ConfigProvider locale={ruRU}>
      <GlobalStyle />
      <RouterProvider router={router}>
        {isFetchingSession && <Spin spinning size="large" fullscreen />}
        <Routing />
      </RouterProvider>
    </ConfigProvider>
  );
};
