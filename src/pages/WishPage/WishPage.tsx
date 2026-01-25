import {useLocation, useNavigate} from 'react-router';
import {FC, memo} from 'react';
import {List} from "@telegram-apps/telegram-ui";
import {useBackendWishlistItem} from "@/hooks/useBackendWishlistItem.tsx";
import {Page} from "@/components/Page.tsx";
import {WishlistItem} from '@/components/WishlistItem';
import {ServiceWishlistItem} from "@/backend-client";

export const WishPage: FC = memo(function WishlistItemPage() {
  const navigate = useNavigate()

  const {state} = useLocation()
  const wish = state as ServiceWishlistItem

  if (!wish) {
    throw "invalid state"
  }

  const {item, isLoading} = useBackendWishlistItem(wish.id!);

  const handleEdit = () => {
    navigate(`edit`, {replace: true, state: item})
  }

  return <Page>
    <List>
      <WishlistItem item={item} isLoading={isLoading} onPressEdit={handleEdit}/>
    </List>
  </Page>
});
