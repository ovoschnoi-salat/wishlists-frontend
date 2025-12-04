import {
  Cell,
  Navigation
} from '@telegram-apps/telegram-ui';
import {FC, memo} from 'react';
import {ServiceWishlistItem} from '@/backend-client';
import {Loading} from "@/components/Loading.tsx";

// Use the ServiceWishlistItem type from backend-client
export type WishlistItem = ServiceWishlistItem;

interface WishlistItemsProps {
  items: WishlistItem[];
  isLoading: boolean;
  onItemClick: (item: WishlistItem) => void;
}

export const WishlistItems: FC<WishlistItemsProps> = memo(function WishlistItems({items, isLoading, onItemClick}) {
  if (isLoading) {
    return <Loading/>;
  }

  if (items.length === 0) {
    return <Cell>No items in this wishlist yet</Cell>
  }

  return items.map((item) => (
    <Cell
      key={item.id}
      onClick={() => onItemClick(item)}
      after={<Navigation/>}
    >
      {item.title}
    </Cell>
  ))
});
