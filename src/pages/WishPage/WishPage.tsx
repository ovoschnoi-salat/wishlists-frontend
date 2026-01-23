import {useNavigate, useParams} from 'react-router';
import {FC, memo} from 'react';
import {List} from "@telegram-apps/telegram-ui";
import {useBackendWishlistItem} from "@/hooks/useBackendWishlistItem.tsx";
import {Page} from "@/components/Page.tsx";
import {WishlistItem} from '@/components/WishlistItem';

export const WishPage: FC = memo(function WishlistItemPage() {
  const navigate = useNavigate()

  const {itemId} = useParams<{ itemId: string }>();

  if (!itemId) {
    return <div>Item ID not found</div>;
  }

  const itemIdNumber = parseInt(itemId, 10);

  if (isNaN(itemIdNumber)) {
    return <div>Invalid item ID</div>;
  }

  const {item, isLoading} = useBackendWishlistItem(itemIdNumber);

  const handleEdit = () => {
    navigate(`edit`, {replace: true, state: item})
  }

  return <Page>
    <List>
      <WishlistItem item={item} isLoading={isLoading} onPressEdit={handleEdit}/>
    </List>
  </Page>
});
