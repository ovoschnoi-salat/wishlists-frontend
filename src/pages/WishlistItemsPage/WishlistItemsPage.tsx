import {WishlistItems} from '@/components/WishlistItems';
import {useParams} from 'react-router-dom';
import type {FC} from 'react';

export const WishlistItemsPage: FC = () => {
  const {wishlistId} = useParams<{ wishlistId: string }>();

  if (!wishlistId) {
    return <div>Wishlist ID not found</div>;
  }

  const wishlistIdNumber = parseInt(wishlistId, 10);

  if (isNaN(wishlistIdNumber)) {
    return <div>Invalid wishlist ID</div>;
  }

  const handleAddItem = () => {
    console.log('Navigate to add item page');
    // TODO: Navigate to add item page
    // Example: navigate(`/wishlist/${wishlistId}/add-item`);
  };

  return (
    <WishlistItems
      wishlistId={wishlistIdNumber}
      onAddItem={handleAddItem}
    />
  );
};
