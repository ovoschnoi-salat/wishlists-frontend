import {WishlistItems} from '@/components/WishlistItems';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {FC} from 'react';
import {ButtonCell, List, Section} from "@telegram-apps/telegram-ui";
import {Page} from "@/components/Page.tsx";
import {loadWishlistItems} from "@/hooks/loadWishlistItems.ts";
import {Icon28Plus} from "@/icons/28/Plus.tsx";
import {ServiceWishlist} from "@/backend-client";

const loadState = () => {
  let { state } = useLocation()
  return state as ServiceWishlist
}

export const WishlistItemsPage: FC = () => {
  let wishlist = loadState()

  // const navigate = useNavigate();
  const {wishlistId} = useParams<{ wishlistId: string }>();

  if (!wishlistId) {
    return <div>Wishlist ID not found</div>;
  }

  const wishlistIdNumber = parseInt(wishlistId, 10);

  if (isNaN(wishlistIdNumber)) {
    return <div>Invalid wishlist ID</div>;
  }

  const navigate = useNavigate()
  const handleItemPress = (itemId: number) => {
    navigate(`/wishlist/${wishlistIdNumber}/item/${itemId}`)
  };

  const {items, isLoading} = loadWishlistItems(wishlistIdNumber);

  const handleEditwWishlistPress = () => {
    navigate(`/wishlist/${wishlistIdNumber}/edit`, {state: wishlist})
  };

  const handleNewWishlistPress = () => {
    navigate(`/wishlist/${wishlistIdNumber}/items/new`)
  };

  return <Page>
    <List>
      <Section header={"Wishlist"}>
        <ButtonCell
          before={<Icon28Plus/>} // TODO
          onClick={handleEditwWishlistPress}
        >
          Edit wishlist
        </ButtonCell>
      </Section>
      <Section header={"Wishlist items"}>
        <WishlistItems items={items} isLoading={isLoading} onItemClick={handleItemPress}/>

        <ButtonCell
          before={<Icon28Plus/>}
          onClick={handleNewWishlistPress}
        >
          Add item
        </ButtonCell>
      </Section>
    </List>
  </Page>
};
