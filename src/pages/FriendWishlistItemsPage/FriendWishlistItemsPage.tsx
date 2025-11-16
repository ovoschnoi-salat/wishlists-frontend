import {useLocation, useNavigate, useParams} from 'react-router';
import {FC} from 'react';
import {List} from "@telegram-apps/telegram-ui";
import {Page} from "@/components/Page.tsx";
import {FriendWishlistItems} from "@/components/FriendWishlistItems";
import {ServiceWishlist, ServiceWishlistItem} from "@/backend-client";
import {loadFriendWishlistItems} from "@/hooks/loadFriendWishlistItems.ts";
import {BackendErrorHandler} from "@/components/BackendErrorHandler/BackendErrorHandler.tsx";

const loadState = () => {
  let {state} = useLocation()
  return state as ServiceWishlist
}

export const FriendWishlistItemsPage: FC = () => {
  const navigate = useNavigate()

  const wishlist = loadState()

  const {wishlistId} = useParams<{ wishlistId: string }>();

  if (!wishlistId) {
    return <div>Wishlist ID not found</div>;
  }

  const wishlistIdNumber = parseInt(wishlistId, 10);

  if (isNaN(wishlistIdNumber)) {
    return <div>Invalid wishlist ID</div>;
  }

  const handleItemPress = (item: ServiceWishlistItem) => {
    navigate(`../item/${item.id}`, {state: item, relative: "path"})
  };

  const {items, isLoading, error, resetError} = loadFriendWishlistItems(wishlistIdNumber);

  return <Page pageTitle={wishlist.title}>
    <BackendErrorHandler error={error} resetError={resetError}/>
    <List>
      <FriendWishlistItems items={items} isLoading={isLoading} onItemClick={handleItemPress}/>
    </List>
  </Page>
};
