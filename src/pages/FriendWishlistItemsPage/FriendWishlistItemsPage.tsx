import {WishlistItems} from '@/components/WishlistItems';
import {useNavigate, useParams} from 'react-router-dom';
import {FC} from 'react';
import {List} from "@telegram-apps/telegram-ui";
import {Page} from "@/components/Page.tsx";
import {loadWishlistItems} from "@/hooks/loadWishlistItems.ts";

export const FriendWishlistItemsPage: FC = () => {
  // const navigate = useNavigate();
  const {friendId, wishlistId} = useParams<{ friendId: string, wishlistId: string }>();

  if (!friendId) {
    return <div>Friend ID not found</div>;
  }
  if (!wishlistId) {
    return <div>Wishlist ID not found</div>;
  }

  const friendIdNumber = parseInt(friendId, 10);

  const wishlistIdNumber = parseInt(wishlistId, 10);

  if (isNaN(friendIdNumber)) {
    return <div>Invalid friend ID</div>;
  }
  if (isNaN(wishlistIdNumber)) {
    return <div>Invalid wishlist ID</div>;
  }

  const navigate = useNavigate()
  const handleItemPress = (itemId: number) => {
    navigate(`/friend/${friendIdNumber}/wishlist/${wishlistIdNumber}/item/${itemId}`)
  };

  const {items, isLoading} = loadWishlistItems(wishlistIdNumber);

  return <Page>
    <List>
      <WishlistItems items={items} isFriendList={true} isLoading={isLoading} onItemClick={handleItemPress}/>
    </List>
  </Page>
};
