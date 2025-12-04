import {useLocation, useNavigate, useParams} from 'react-router';
import {FC, memo} from 'react';
import {List} from "@telegram-apps/telegram-ui";
import {Page} from "@/components/Page.tsx";
import {FriendWishlistItems} from "@/components/FriendWishlistItems";
import {ServiceWishlist, ServiceWishlistItem} from "@/backend-client";
import {useBackendFriendWishlistItems} from "@/hooks/useBackendFriendWishlistItems.ts";
import {BackendErrorHandler} from "@/components/BackendErrorHandler/BackendErrorHandler.tsx";

const useLocationState = () => {
  const {state} = useLocation()
  return state as ServiceWishlist
}

export const FriendWishlistItemsPage: FC = memo(function FriendWishlistItemsPage() {
  const navigate = useNavigate()

  const wishlist = useLocationState()

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

  const {items, isLoading, error, resetError} = useBackendFriendWishlistItems(wishlistIdNumber);

  return <Page pageTitle={wishlist.title}>
    <BackendErrorHandler error={error} resetError={resetError}/>
    <List title={"Friend wishlists"}>
      <FriendWishlistItems items={items} isLoading={isLoading} onItemClick={handleItemPress}/>
    </List>
  </Page>
});
