import {useMemo} from 'react';
import {retrieveLaunchParams, useSignal, isMiniAppDark} from '@telegram-apps/sdk-react';
import {AppRoot} from '@telegram-apps/telegram-ui';

import {createBrowserRouter} from "react-router";
import {PageWithTabbar} from "@/pages/PageWithTabbar/PageWithTabbar.tsx";
import {WishlistsPage} from "@/pages/WishlistsPage";
import {InitDataPage} from "@/pages/InitDataPage.tsx";
import {ThemeParamsPage} from "@/pages/ThemeParamsPage.tsx";
import {LaunchParamsPage} from "@/pages/LaunchParamsPage.tsx";
import {RouterProvider} from "react-router/dom";
import {WishlistItemsPage} from '@/pages/WishlistItemsPage';
import {Button, Snackbar, Text} from "@telegram-apps/telegram-ui";
import {useRouteError} from "react-router-dom";
import {WishlistItemPage} from "@/pages/WishlistItemPage";

function ErrorBoundaryError() {
  let error = useRouteError();
  return (
    <Snackbar description={"Unexpected Error"} duration={10_000} onClose={() => {
    }} after={
      <Button onClick={() => {
        const text = error instanceof Error ? `${error.message}\n\n${error.stack ?? ''}`
          : typeof error === 'string' ? error : JSON.stringify(error);
        navigator.clipboard?.writeText(text).catch(() => {
        });
      }}>
        Copy
      </Button>
    }>
      <Text>
        {error instanceof Error ? error.message
          : typeof error === 'string' ? error : JSON.stringify(error)
        }
      </Text>
    </Snackbar>

  );
}

export function App() {
  const lp = useMemo(() => retrieveLaunchParams(), []);
  const isDark = useSignal(isMiniAppDark);

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base'}
    >
      <RouterProvider router={router}/>
    </AppRoot>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    Component: PageWithTabbar,
    errorElement: <ErrorBoundaryError/>,
    children:
      [
        {index: true, Component: WishlistsPage},
        {path: '/init-data', Component: InitDataPage},
        {path: '/theme-params', Component: ThemeParamsPage},
        {path: '/launch-params', Component: LaunchParamsPage},
        {path: '/wishlists/:wishlistId', Component: WishlistItemsPage},
        {path: '/wishlists/item/:itemId', Component: WishlistItemPage}
      ]
  },
]);
