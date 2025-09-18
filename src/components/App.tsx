import { useMemo } from 'react';
import { retrieveLaunchParams, useSignal, isMiniAppDark } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';

import { createBrowserRouter } from "react-router";
import {IndexPage} from "@/pages/IndexPage/IndexPage.tsx";
import {WishlistsPage} from "@/pages/WishlistsPage/WishlistsPage.tsx";
import {InitDataPage} from "@/pages/InitDataPage.tsx";
import {ThemeParamsPage} from "@/pages/ThemeParamsPage.tsx";
import {LaunchParamsPage} from "@/pages/LaunchParamsPage.tsx";
import { RouterProvider } from "react-router/dom";

export function App() {
  const lp = useMemo(() => retrieveLaunchParams(), []);
  const isDark = useSignal(isMiniAppDark);

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base'}
    >
      <RouterProvider router={router} />
    </AppRoot>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    Component: IndexPage,
    children:
      [
        {index: true, Component: WishlistsPage},
        {path: '/init-data', Component: InitDataPage},
        {path: '/theme-params', Component: ThemeParamsPage},
        {path: '/launch-params', Component: LaunchParamsPage}
      ]
  },
]);
