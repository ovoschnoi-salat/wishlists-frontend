import {useLocation, useNavigate} from 'react-router';
import {FC, memo} from 'react';
import {List} from "@telegram-apps/telegram-ui";
import {useBackendWishlistItem} from "@/hooks/useBackendWishlistItem.tsx";
import {Page} from "@/components/Page.tsx";
import {Wish} from '@/components/Wish';
import {ServiceWishlist, ServiceWishlistItem} from "@/backend-client";
import {useTranslation} from "react-i18next";

export type WishPageState = {
  wishlist: ServiceWishlist
  wish: ServiceWishlistItem
}

export const WishPage: FC = memo(function WishlistItemPage() {
  const navigate = useNavigate()
  const {t} = useTranslation();

  const {state} = useLocation()
  const {wishlist, wish} = state as WishPageState

  if (!wish || !wishlist) {
    throw t('invalidState')
  }

  const {item, isLoading} = useBackendWishlistItem(wish);

  const handleEdit = () => {
    navigate(`edit`, {replace: true, state: {wishlist, wish: item} as WishPageState})
  }

  return <Page>
    <List>
      <Wish wishlist={wishlist} item={item} isLoading={isLoading} onPressEdit={handleEdit}/>
    </List>
  </Page>
});
