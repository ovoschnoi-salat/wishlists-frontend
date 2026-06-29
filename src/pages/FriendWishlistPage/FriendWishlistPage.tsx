import {useLocation, useNavigate} from 'react-router';
import {FC, memo, ReactNode} from 'react';
import {Cell, List, Section, Title} from "@telegram-apps/telegram-ui";
import {Page} from "@/components/Page.tsx";
import {FriendWishes} from "@/components/FriendWishes";
import {ServiceFriendWishlist, ServiceWishlistItem} from "@/backend-client";
import {useBackendFriendWishlistItems} from "@/hooks/useBackendFriendWishlistItems.tsx";
import {useTranslation} from "react-i18next";
import {FriendWishPageState} from "@/pages/FriendWishPage/FriendWishPage.tsx";

const useLocationState = () => {
  const {state} = useLocation()
  return state as ServiceFriendWishlist
}

export const FriendWishlistPage: FC = memo(function FriendWishlistItemsPage() {
  const navigate = useNavigate()
  const {t} = useTranslation();

  const wishlist = useLocationState()

  if (!wishlist) {
    throw t('invalidState')
  }

  const handleItemPress = (item: ServiceWishlistItem) => {
    navigate(`item`, {state: {wishlist: wishlist, wish: item} as FriendWishPageState, relative: "path"})
  };

  const {items, isLoading} = useBackendFriendWishlistItems(wishlist.id!);

  const descriptionCells: ReactNode[] = [
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
    descriptionCells.push([
      <Cell key="description" subhead={t('wishlist.description')} multiline={true}>
        {wishlist.description}
      </Cell>
    ])
  }

  return <Page>
    <List>
      <Section header={t('wishlist.friendWishlist')}>
        {...descriptionCells}
      </Section>

      <Section header={t('wishlist.wishes')}>
        <FriendWishes items={items} isLoading={isLoading} onItemClick={handleItemPress}/>
      </Section>
    </List>
  </Page>
});
