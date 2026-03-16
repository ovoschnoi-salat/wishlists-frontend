import {useLocation, useNavigate} from 'react-router';
import {FC, memo} from 'react';
import {List} from "@telegram-apps/telegram-ui";
import {useBackendWishlistItem} from "@/hooks/useBackendWishlistItem.tsx";
import {Page} from "@/components/Page.tsx";
import {Wish} from '@/components/Wish';
import {ServiceWishlistItem} from "@/backend-client";
import {useTranslation} from "react-i18next";

export const WishPage: FC = memo(function WishlistItemPage() {
  const navigate = useNavigate()
  const {t} = useTranslation();

  const {state} = useLocation()
  const wish = state as ServiceWishlistItem

  if (!wish) {
    throw t('invalidState')
  }

  const {item, isLoading} = useBackendWishlistItem(wish);

  const handleEdit = () => {
    navigate(`edit`, {replace: true, state: item})
  }

  return <Page>
    <List>
      <Wish item={item} isLoading={isLoading} onPressEdit={handleEdit}/>
    </List>
  </Page>
});
