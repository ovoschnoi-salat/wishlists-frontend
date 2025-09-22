import {WishlistItem} from '@/components/WishlistItem';
import {useParams} from 'react-router-dom';
import type {FC} from 'react';

export const WishlistItemPage: FC = () => {
  const {itemId} = useParams<{ itemId: string }>();

  if (!itemId) {
    return <div>Item ID not found</div>;
  }


  const itemIdNumber = parseInt(itemId, 10);

  if (isNaN(itemIdNumber)) {
    return <div>Invalid item ID</div>;
  }

  return (
    <WishlistItem itemId={itemIdNumber}/>
  );
};
