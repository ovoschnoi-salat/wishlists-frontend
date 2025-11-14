import {WishlistItems} from '@/components/WishlistItems';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {FC} from 'react';
import {ButtonCell, Cell, List, Section} from "@telegram-apps/telegram-ui";
import {Page} from "@/components/Page.tsx";
import {loadWishlistItems} from "@/hooks/loadWishlistItems.ts";
import {Icon28Plus} from "@/icons/28/Plus.tsx";
import {ServiceWishlist, ServiceWishlistItem} from "@/backend-client";
import {Icon24Edit} from "@/icons/24";

const loadState = () => {
  let {state} = useLocation()
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
  const handleItemPress = (item: ServiceWishlistItem) => {
    navigate(`/wishlist/${wishlistIdNumber}/item/${item.id}`, {state: item})
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
      <Section>
        <Cell subhead="Title" subtitle={wishlist.is_private ? "private" : undefined}>
          {wishlist.title}
        </Cell>

        <Cell subhead="Description">
          {wishlist.description}
        </Cell>

        <ButtonCell
          before={<Icon24Edit/>}
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
