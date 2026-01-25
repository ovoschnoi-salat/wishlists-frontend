import {WishlistItems} from '@/components/WishlistItems';
import {useLocation, useNavigate} from 'react-router';
import {FC, memo, useCallback} from 'react';
import {Button, ButtonCell, Cell, List, Section, Title} from "@telegram-apps/telegram-ui";
import {Page} from "@/components/Page.tsx";
import {useBackendWishlistItems} from "@/hooks/useBackendWishlistItems.tsx";
import {Icon28Plus} from "@/icons/28/Plus.tsx";
import {ServiceWishlist, ServiceWishlistItem} from "@/backend-client";
import {Icon24Edit} from "@/icons/24";

export const WishlistPage: FC = memo(function WishlistItemsPage() {
  const navigate = useNavigate();

  const {state} = useLocation()
  const wishlist = state as ServiceWishlist

  const handleItemPress = useCallback((item: ServiceWishlistItem) => {
    navigate(`item`, {state: item})
  }, [navigate]);

  const handleEditWishlistPress = useCallback(() => {
    navigate(`edit`, {replace: true, state: wishlist})
  }, [navigate, wishlist]);

  const handleNewWishPress = useCallback(() => {
    navigate(`items/new`, {state: wishlist})
  }, [navigate, wishlist]);

  const {items, isLoading} = useBackendWishlistItems(wishlist.id!);

  return <Page pageTitle={wishlist.title}>
    <List>
      <Section>
        <Cell subhead="Title" subtitle={wishlist.is_private ? "private" : undefined}>
          <Title level="3">
            {wishlist.title}
          </Title>
        </Cell>

        {wishlist.description &&
         <Cell subhead="Description">
           {wishlist.description}
         </Cell>
        }

        <ButtonCell
          before={<Icon24Edit/>}
          onClick={handleEditWishlistPress}
        >
          Edit wishlist
        </ButtonCell>
      </Section>

      <Section>
        <Button
          mode="filled"
          size="m"
          stretched
        >
          Share wishlist
        </Button>
      </Section>

      <Section header={"Wishlist items"}>
        <WishlistItems items={items} isLoading={isLoading} onItemClick={handleItemPress}/>

        <ButtonCell
          before={<Icon28Plus/>}
          onClick={handleNewWishPress}
        >
          Add wish
        </ButtonCell>
      </Section>
    </List>
  </Page>
});
