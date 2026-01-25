import {useSignal, miniApp, useLaunchParams} from '@tma.js/sdk-react';
import {AppRoot} from '@telegram-apps/telegram-ui';

import {createBrowserRouter, Navigate} from "react-router";
import {RouterProvider} from "react-router/dom";
import {
  InitDataPage,
  ThemeParamsPage,
  LaunchParamsPage,
  PageWithTabbar,
  WishlistsPage,
  WishPage,
  FriendsPage,
  NewFriendPage,
  IncomingFriendsRequestsPage,
  FriendPage,
  FriendWishlistPage,
  NewWishlistPage,
  NewWishPage,
  WishlistPage,
  FriendWishPage,
  EditWishlistPage,
  EditWishPage,
  SettingsPage
} from "@/pages";
import {useRouteError} from "react-router";
import {ErrorSnackbar} from "@/components/ErrorSnackbar/ErrorSnackbar.tsx";
import {errorToString} from "@/helpers/error.ts";
import {Toaster} from "react-hot-toast";

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <ErrorSnackbar
      title={"Unexpected error"}
      description={"please copy error and send report"}
      copyMsg={errorToString(error)}/>
  );
}

export function InitialNavigation() {

  const lp = useLaunchParams();

  const startParam = lp.tgWebAppStartParam;
  console.log(startParam);

  return <Navigate to="/wishlists"/>
  //
  // if (!startParam) {
  //   return <Navigate to="/wishlists"/>
  // }
  // const parts = startParam.split("_")
  // if (parts.length < 2) {
  //   return <Navigate to="/wishlists"/>
  // }
  // if (parts[0] === "wishlist") {
  //   return <SharedWishlistPage/>
  // }
  //
  // return lp.tgWebAppStartParam ? (<Navigate to="/dashboard" replace/>) : (<Navigate to="/login" replace/>);
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
      <Toaster position="bottom-center"/>
    </AppRoot>
  );
}

const router = createBrowserRouter([
  {
    Component: PageWithTabbar,
    errorElement: <ErrorBoundary/>,
    children:
      [
        {index: true, Component: InitialNavigation},
        {path: '/wishlists', Component: WishlistsPage},
        {path: '/wishlists/new', Component: NewWishlistPage},
        {path: '/wishlists/:wishlistId/items', Component: WishlistPage},
        {path: '/wishlists/:wishlistId/edit', Component: EditWishlistPage},
        {path: '/wishlists/:wishlistId/items/new', Component: NewWishPage},
        {path: '/wishlists/:wishlistId/items/:itemId', Component: WishPage},
        {path: '/wishlists/:wishlistId/items/:itemId/edit', Component: EditWishPage},

        {path: '/friends', Component: FriendsPage},
        {path: '/friends/new', Component: NewFriendPage},
        {path: '/friends/requests/incoming', Component: IncomingFriendsRequestsPage},
        {path: '/friends/:friendId/wishlists', Component: FriendPage},
        {path: '/friends/:friendId/wishlists/:wishlistId/items', Component: FriendWishlistPage},
        {path: '/friends/:friendId/wishlists/:wishlistId/items/:itemId', Component: FriendWishPage},

        {path: '/settings', Component: SettingsPage},

        ...(import.meta.env.DEV ? [
          {path: '/init-data', Component: InitDataPage},
          {path: '/theme-params', Component: ThemeParamsPage},
          {path: '/launch-params', Component: LaunchParamsPage}
        ] : [])
      ]
  },
]);
