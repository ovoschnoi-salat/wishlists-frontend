import {Wishes} from '@/components/Wishes';
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
import {useTranslation} from "react-i18next";
import {WishPageState} from "@/pages/WishPage/WishPage.tsx";

export const WishlistPage: FC = memo(function WishlistItemsPage() {
  const navigate = useNavigate();
  const {t} = useTranslation();

  const {state} = useLocation()
  const wishlist = state as ServiceWishlist

  if (!wishlist) {
    throw t('invalidState')
  }

  const handleItemPress = useCallback((wish: ServiceWishlistItem) => {
    navigate(`item`, {state: {wishlist, wish} as WishPageState})
  }, [navigate, wishlist]);

  const handleEditWishlistPress = useCallback(() => {
    navigate(`edit`, {replace: true, state: wishlist})
  }, [navigate, wishlist]);

  const handleShareWishlistPress = useCallback(async () => {
    const link = "https://t.me/" + import.meta.env.VITE_BOT_NAME + "?startapp=wishlist_" + wishlist.share_uuid
    await copyTextToClipboard(link);
    // TODO translate etc..
    shareURL(link, `\nHere is link to my wishlist "${wishlist.title}"`)
  }, [wishlist]);

  const handleNewWishPress = useCallback(() => {
    navigate(`items/new`, {state: wishlist})
  }, [navigate, wishlist]);

  const {items, isLoading} = useBackendWishlistItems(wishlist.id!);

  const wishlistCells: ReactNode[] = [
    <Cell
      key="title"
      subhead={t('wishlist.title')}
      subtitle={wishlist.is_private ? t('wishlist.private') : undefined}
      multiline={true}
    >
      <Title level="3">
        {wishlist.title}
      </Title>
    </Cell>
  ]

  if (wishlist.description) {
    wishlistCells.push([
      <Cell key="description" subhead={t('wishlist.description')} multiline={true}>
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
      {t('wishlist.editWishlist')}
    </ButtonCell>
  ])

  return <Page>
    <List>
      <Section>
        {...wishlistCells}
      </Section>

      <Section footer={t('wishlist.shareDescription')}>
        <StretchedButton
          mode="filled"
          size="m"
          stretched
          onClick={handleShareWishlistPress}
        >
          {t('wishlist.shareWishlist')}
        </StretchedButton>
      </Section>

      <Section>
        <ButtonCell
          before={<Icon28Plus/>}
          onClick={handleNewWishPress}
        >
          {t('wishlist.addWish')}
        </ButtonCell>
      </Section>

      <Wishes items={items} isLoading={isLoading} onItemClick={handleItemPress}/>
    </List>
  </Page>
});
