import {WishlistItems} from '@/components/WishlistItems';
import {useNavigate, useParams} from 'react-router-dom';
import {FC} from 'react';
import {ButtonCell, List, Section} from "@telegram-apps/telegram-ui";
import {Page} from "@/components/Page.tsx";
import {loadWishlistItems} from "@/hooks/loadWishlistItems.ts";
import {Icon28Plus} from "@/icons/28/Plus.tsx";

export const WishlistItemsPage: FC = () => {
  // const navigate = useNavigate();
  const {wishlistId} = useParams<{ wishlistId: string }>();

  if (!wishlistId) {
    return <div>Wishlist ID not found</div>;
  }

  const wishlistIdNumber = parseInt(wishlistId, 10);

  if (isNaN(wishlistIdNumber)) {
    return <div>Invalid wishlist ID</div>;
  }

  const navigate = useNavigate()
  const handleItemPress = (itemId: number) => {
    navigate(`/wishlist/${wishlistIdNumber}/item/${itemId}`)
  };

  const {items, isLoading} = loadWishlistItems(wishlistIdNumber);

  const handleNewWishlistPress = () => {
    console.log('Navigate to add item page');
    // TODO: Navigate to add item page
    // Example: navigate(`/wishlist/${wishlistId}/add-item`);
    navigate(`/wishlist/${wishlistIdNumber}/items/new`)
  };

  return <Page>
    <List>
      <Section header={"Wishlist items"}>
        <WishlistItems items={items} isFriendList={false} isLoading={isLoading} onItemClick={handleItemPress}/>

        <ButtonCell
          before={<Icon28Plus/>}
          onClick={handleNewWishlistPress}
        >
          Add item
        </ButtonCell>
      </Section>
    </List>
  </Page>
};
