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
import {errorToString} from "@/helpers/error.ts";
import {toast, Toaster} from "react-hot-toast";
import {SharedWishlistPage} from "@/pages/SharedWishlistPage/SharedWishlistPage.tsx";

export function ErrorBoundary() {
  const error = useRouteError();
  toast.error(errorToString(error))
  return <Navigate to="/"/>
  // return (
  //   <ErrorSnackbar
  //     title={"Unexpected error"}
  //     description={"please copy error and send report"}
  //     copyMsg={errorToString(error)}
  //   />
  // );
}

export function InitialNavigation() {

  const lp = useLaunchParams();

  const startParam = lp.tgWebAppStartParam;

  if (startParam) {
    const parts = startParam.split("_")
    if (parts.length == 2) {
      if (parts[0] === "wishlist") {

        return <Navigate to="/shared/wishlist" replace={true}/>
      }
    }
  }

  return <Navigate to="/wishlists" replace={true}/>
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
        {path: '/wishlist', Component: WishlistPage},
        {path: '/wishlist/edit', Component: EditWishlistPage},
        {path: '/wishlist/items/new', Component: NewWishPage},
        {path: '/wishlist/item', Component: WishPage},
        {path: '/wishlist/item/edit', Component: EditWishPage},

        {path: '/friends', Component: FriendsPage},
        {path: '/friends/new', Component: NewFriendPage},
        {path: '/friends/requests/incoming', Component: IncomingFriendsRequestsPage},
        {path: '/friend', Component: FriendPage},
        {path: '/friend/wishlist', Component: FriendWishlistPage},
        {path: '/friend/wishlist/item', Component: FriendWishPage},

        {path: '/shared/wishlist', Component: SharedWishlistPage},

        {path: '/settings', Component: SettingsPage},

        {path: '/theme-params', Component: ThemeParamsPage},

        ...(import.meta.env.DEV ? [
          {path: '/init-data', Component: InitDataPage},
          {path: '/launch-params', Component: LaunchParamsPage}
        ] : [])
      ]
  },
]);
