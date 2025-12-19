import {useSignal, miniApp, useLaunchParams} from '@tma.js/sdk-react';
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
  NewFriendPage,
  IncomingFriendsRequestsPage,
  FriendWishlistsPage,
  FriendWishlistItemsPage,
  NewWishlistPage,
  NewWishlistItemPage,
  WishlistItemsPage,
  FriendWishlistItemPage,
  EditWishlistPage,
  EditWishlistItemPage,
  SettingsPage
} from "@/pages";
import {useRouteError} from "react-router";
import {ErrorSnackbar} from "@/components/ErrorSnackbar/ErrorSnackbar.tsx";
import {errorToString} from "@/helpers/error.ts";

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <ErrorSnackbar
      title={"Unexpected error"}
      description={"please copy error and send report"}
      copyMsg={errorToString(error)}/>
  );
}

export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);

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
    errorElement: <ErrorBoundary/>,
    children:
      [
        ...(import.meta.env.DEV ? [
          {path: '/init-data', Component: InitDataPage},
          {path: '/theme-params', Component: ThemeParamsPage},
          {path: '/launch-params', Component: LaunchParamsPage}
        ] : []),

        {index: true, Component: WishlistsPage},
        {path: '/wishlists/new', Component: NewWishlistPage},
        {path: '/wishlist/:wishlistId/items', Component: WishlistItemsPage},
        {path: '/wishlist/:wishlistId/edit', Component: EditWishlistPage},
        {path: '/wishlist/:wishlistId/items/new', Component: NewWishlistItemPage},
        {path: '/wishlist/:wishlistId/item/:itemId', Component: WishlistItemPage},
        {path: '/wishlist/:wishlistId/item/:itemId/edit', Component: EditWishlistItemPage},

        {path: '/friends', Component: FriendsPage},
        {path: '/friend/new', Component: NewFriendPage},
        {path: '/friends/requests/incoming', Component: IncomingFriendsRequestsPage},
        {path: '/friend/:friendId/wishlists', Component: FriendWishlistsPage},
        {path: '/friend/:friendId/wishlist/:wishlistId/items', Component: FriendWishlistItemsPage},
        {path: '/friend/:friendId/wishlist/:wishlistId/item/:itemId', Component: FriendWishlistItemPage},

        {path: '/settings', Component: SettingsPage}
      ]
  },
]);
