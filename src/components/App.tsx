import {useMemo} from 'react';
import {retrieveLaunchParams, useSignal, isMiniAppDark} from '@telegram-apps/sdk-react';
import {AppRoot} from '@telegram-apps/telegram-ui';

import {createBrowserRouter} from "react-router";
import {RouterProvider} from "react-router/dom";
import {
  InitDataPage,
  ThemeParamsPage,
  LaunchParamsPage,
  PageWithTabbar,
  WishlistsPage,
  WishlistItemPage,
  FriendsPage,
  FriendWishlistsPage,
  FriendWishlistItemsPage,
  NewWishlistPage,
  NewWishlistItemPage, WishlistItemsPage, NewFriendPage
} from "@/pages";
import {Button, Snackbar, Text} from "@telegram-apps/telegram-ui";
import {useRouteError} from "react-router-dom";
import {FriendWishlistItemPage} from "@/pages/FriendWishlistItemPage";

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
        {path: '/init-data', Component: InitDataPage},
        {path: '/theme-params', Component: ThemeParamsPage},
        {path: '/launch-params', Component: LaunchParamsPage},

        {index: true, Component: WishlistsPage},
        {path: '/wishlists/new', Component: NewWishlistPage},
        {path: '/wishlist/:wishlistId/items', Component: WishlistItemsPage},
        {path: '/wishlist/:wishlistId/items/new', Component: NewWishlistItemPage},
        {path: '/wishlist/:wishlistId/item/:itemId', Component: WishlistItemPage},

        {path: '/friends', Component: FriendsPage},
        {path: '/friend/new', Component: NewFriendPage},
        {path: '/friend/:friendId/wishlists', Component: FriendWishlistsPage},
        {path: '/friend/:friendId/wishlist/:wishlistId/items', Component: FriendWishlistItemsPage},
        {path: '/friend/:friendId/wishlist/:wishlistId/item/:itemId', Component: FriendWishlistItemPage}
      ]
  },
]);
