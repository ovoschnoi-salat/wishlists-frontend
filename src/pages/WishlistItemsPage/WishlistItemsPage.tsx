import {WishlistItems} from '@/components/WishlistItems';
import {useLocation, useNavigate, useParams} from 'react-router';
import {FC} from 'react';
import {ButtonCell, Cell, List, Section} from "@telegram-apps/telegram-ui";
import {Page} from "@/components/Page.tsx";
import {loadWishlistItems} from "@/hooks/loadWishlistItems.ts";
import {Icon28Plus} from "@/icons/28/Plus.tsx";
import {ServiceWishlist, ServiceWishlistItem} from "@/backend-client";
import {Icon24Edit} from "@/icons/24";
import {BackendErrorHandler} from "@/components/BackendErrorHandler/BackendErrorHandler.tsx";

const loadState = () => {
  const {state} = useLocation()
  return (state as ServiceWishlist)
}

export const WishlistItemsPage: FC = () => {
  const navigate = useNavigate();

  const wishlist = loadState()

  const {wishlistId} = useParams<{ wishlistId: string }>();

  if (!wishlistId) {
    return <div>Wishlist ID not found</div>;
  }

  const wishlistIdNumber = parseInt(wishlistId, 10);

  if (isNaN(wishlistIdNumber)) {
    return <div>Invalid wishlist ID</div>;
  }

  const {items, isLoading, error, resetError} = loadWishlistItems(wishlistIdNumber);

  const handleItemPress = (item: ServiceWishlistItem) => {
    navigate(`../item/${item.id}`, {relative: "path", state: item})

  };

  const handleEditwWishlistPress = () => {
    navigate(`../edit`, {replace: true, relative: "path", state: wishlist})
  };

  const handleNewWishlistPress = () => {
    navigate(`new`)
  };

  return <Page pageTitle={wishlist.title}>
    <BackendErrorHandler error={error} resetError={resetError}/>
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
