import {useSignal, miniApp, useLaunchParams} from '@tma.js/sdk-react';
import {AppRoot} from '@telegram-apps/telegram-ui';

import {BrowserRouter, Route, Router, Routes} from "react-router";
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
    <ErrorSnackbar title={"Unexpected error"} description={"please copy error and send report"}
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageWithTabbar/>}>
            {import.meta.env.DEV && <Route path='/init-data' element={<InitDataPage/>}/>},
            {import.meta.env.DEV && <Route path='/theme-params' element={<ThemeParamsPage/>}/>},
            {import.meta.env.DEV && <Route path='/launch-params' element={<LaunchParamsPage/>}/>},

            <Route index={true} element={<WishlistsPage/>}/>,
            <Route path='/wishlists/new' element={<NewWishlistPage/>}/>,
            <Route path='/wishlists/new' element={<NewWishlistPage/>}/>,
            <Route path='/wishlist/:wishlistId/items' element={<WishlistItemsPage/>}/>,
            <Route path='/wishlist/:wishlistId/edit' element={<EditWishlistPage/>}/>,
            <Route path='/wishlist/:wishlistId/items/new' element={<NewWishlistItemPage/>}/>,
            <Route path='/wishlist/:wishlistId/item/:itemId' element={<WishlistItemPage/>}/>,
            <Route path='/wishlist/:wishlistId/item/:itemId/edit' element={<EditWishlistItemPage/>}/>,

            <Route path='/friends' element={<FriendsPage/>}/>,
            <Route path='/friend/new' element={<NewFriendPage/>}/>,
            <Route path='/friends/requests/incoming' element={<IncomingFriendsRequestsPage/>}/>,
            <Route path='/friend/:friendId/wishlists' element={<FriendWishlistsPage/>}/>,
            <Route path='/friend/:friendId/wishlist/:wishlistId/items' element={<FriendWishlistItemsPage/>}/>,
            <Route path='/friend/:friendId/wishlist/:wishlistId/item/:itemId' element={<FriendWishlistItemPage/>}/>,

            <Route path='/settings' element={<SettingsPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppRoot>
  );
}
