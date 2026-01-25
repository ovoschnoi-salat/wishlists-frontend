import {WishlistItems} from '@/components/WishlistItems';
import {useLocation, useNavigate} from 'react-router';
import {FC, memo, ReactNode, useCallback} from 'react';
import {ButtonCell, Cell, List, Section, Title} from "@telegram-apps/telegram-ui";
import {Page} from "@/components/Page.tsx";
import {useBackendWishlistItems} from "@/hooks/useBackendWishlistItems.tsx";
import {Icon28Plus} from "@/icons/28/Plus.tsx";
import {ServiceWishlist, ServiceWishlistItem} from "@/backend-client";
import {Icon24Edit} from "@/icons/24";
import {StretchedButton} from "@/components/StretchedButton/StretchedButton.tsx";
import {copyTextToClipboard, shareURL} from "@tma.js/sdk-react";

export const WishlistPage: FC = memo(function WishlistItemsPage() {
  const navigate = useNavigate();

  const {state} = useLocation()
  const wishlist = state as ServiceWishlist

  if (!wishlist) {
    throw "invalid state"
  }

  const handleItemPress = useCallback((item: ServiceWishlistItem) => {
    navigate(`item`, {state: item})
  }, [navigate]);

  const handleEditWishlistPress = useCallback(() => {
    navigate(`edit`, {replace: true, state: wishlist})
  }, [navigate, wishlist]);

  const handleShareWishlistPress = useCallback(async () => {
    const link = "https://t.me/" + import.meta.env.VITE_BOT_NAME + "?startapp=wishlist_" + wishlist.share_uuid
    await copyTextToClipboard(link);
    shareURL(link, `Here is my wishlist "${wishlist.title}"`)
  }, [wishlist]);

  const handleNewWishPress = useCallback(() => {
    navigate(`items/new`, {state: wishlist})
  }, [navigate, wishlist]);

  const {items, isLoading} = useBackendWishlistItems(wishlist.id!);

  const wishlistCells: ReactNode[] = [
    <Cell key="title" subhead="Title" subtitle={wishlist.is_private ? "private" : undefined}>
      <Title level="3">
        {wishlist.title}
      </Title>
    </Cell>
  ]

  if (wishlist.description) {
    wishlistCells.push([
      <Cell key="description" subhead="Description">
        {wishlist.description}
      </Cell>
    ])
  }

  wishlistCells.push([
    <ButtonCell
      key="edit"
      before={<Icon24Edit/>}
      onClick={handleEditWishlistPress}
    >
      Edit wishlist
    </ButtonCell>
  ])

  return <Page pageTitle={wishlist.title}>
    <List>
      <Section>
        {...wishlistCells}
      </Section>

      <Section footer="User with this link will be added to your friends and added to wishlist access list if it is private">
        <StretchedButton
          mode="filled"
          size="m"
          stretched
          onClick={handleShareWishlistPress}
        >
          Share wishlist
        </StretchedButton>
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
