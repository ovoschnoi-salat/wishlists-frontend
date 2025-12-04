import {WishlistItems} from '@/components/WishlistItems';
import {useLocation, useNavigate, useParams} from 'react-router';
import {FC, memo, useCallback} from 'react';
import {ButtonCell, Cell, List, Section} from "@telegram-apps/telegram-ui";
import {Page} from "@/components/Page.tsx";
import {useBackendWishlistItems} from "@/hooks/useBackendWishlistItems.ts";
import {Icon28Plus} from "@/icons/28/Plus.tsx";
import {ServiceWishlist, ServiceWishlistItem} from "@/backend-client";
import {Icon24Edit} from "@/icons/24";
import {BackendErrorHandler} from "@/components/BackendErrorHandler/BackendErrorHandler.tsx";

export const WishlistItemsPage: FC = memo(function WishlistItemsPage() {
  const navigate = useNavigate();

  const {state} = useLocation()
  const wishlist = state as ServiceWishlist

  const handleItemPress = useCallback((item: ServiceWishlistItem) => {
    navigate(`../item/${item.id}`, {relative: "path", state: item})
  }, [navigate]);

  const handleEditwWishlistPress = useCallback(() => {
    navigate(`../edit`, {replace: true, relative: "path", state: wishlist})
  }, [navigate, wishlist]);

  const handleNewWishlistPress = useCallback(() => {
    navigate(`new`)
  }, [navigate]);

  const {wishlistId} = useParams<{ wishlistId: string }>();

  if (!wishlistId) {
    return <div>Wishlist ID not found</div>;
  }

  const wishlistIdNumber = parseInt(wishlistId, 10);

  if (isNaN(wishlistIdNumber)) {
    return <div>Invalid wishlist ID</div>;
  }

  const {items, isLoading, error, resetError} = useBackendWishlistItems(wishlistIdNumber);

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
});
