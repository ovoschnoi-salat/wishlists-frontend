import {useNavigate, useParams} from 'react-router-dom';
import {FC} from 'react';
import {List} from "@telegram-apps/telegram-ui";
import {Page} from "@/components/Page.tsx";
import {NewWishlistItem} from "@/components/NewWishlistItem/NewWishlistItem.tsx";

export const NewWishlistItemPage: FC = () => {
  const {wishlistId} = useParams<{ wishlistId: string }>();

  if (!wishlistId) {
    return <div>Wishlist ID not found</div>;
  }

  const wishlistIdNumber = parseInt(wishlistId, 10);

  if (isNaN(wishlistIdNumber)) {
    return <div>Invalid wishlist ID</div>;
  }

  const navigate = useNavigate()


  const handleSaveNewWishlistItem = () => {
    console.log('Navigate to add item page');
    // TODO: Navigate to add item page
    // Example: navigate(`/wishlist/${wishlistId}/add-item`);
    let itemId = 0
    navigate(`/wishlist/${wishlistId}/item/${itemId}`)
  };

  return (
    <Page>
      <List>
        <NewWishlistItem
          onSave={handleSaveNewWishlistItem}
        />
      </List>
    </Page>
  );
};
