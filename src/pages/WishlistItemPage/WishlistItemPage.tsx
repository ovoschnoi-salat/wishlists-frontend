import {useNavigate, useParams} from 'react-router';
import {FC} from 'react';
import {List} from "@telegram-apps/telegram-ui";
import {loadWishlistItem} from "@/hooks/loadWishlistItem.ts";
import {Page} from "@/components/Page.tsx";
import {WishlistItem} from '@/components/WishlistItem';


export const WishlistItemPage: FC = () => {
  const {itemId} = useParams<{ itemId: string }>();

  if (!itemId) {
    return <div>Item ID not found</div>;
  }

  const itemIdNumber = parseInt(itemId, 10);

  if (isNaN(itemIdNumber)) {
    return <div>Invalid item ID</div>;
  }

  const {item, isLoading} = loadWishlistItem(itemIdNumber);

  const navigate = useNavigate()

  const handleEdit = () => {
    navigate(`/wishlist/${item.wishlist_id!}/item/${item.id!}/edit`, {replace: true, state: item})
  }

  return <Page>
    <List>
      <WishlistItem item={item} isLoading={isLoading} onPressEdit={handleEdit}/>
    </List>
  </Page>
};
