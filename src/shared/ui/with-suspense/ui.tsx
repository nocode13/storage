import { Suspense } from 'react';

import { FullScreenLoader } from '../full-screen-loader';

// eslint-disable-next-line react-refresh/only-export-components
const WithSuspense = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<FullScreenLoader />}>{children}</Suspense>;
};

export const withSuspense = (Component: React.FC) => {
  return () => (
    <WithSuspense>
      <Component />
    </WithSuspense>
  );
};
