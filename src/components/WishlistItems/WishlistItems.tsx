import {
  Cell,
  Navigation
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';
import {ServiceWishlistItem} from '@/backend-client';
import {Loading} from "@/components/Loading.tsx";

// Use the ServiceWishlistItem type from backend-client
export type WishlistItem = ServiceWishlistItem;

interface WishlistItemsProps {
  items: WishlistItem[];
  isFriendList: boolean;
  isLoading: boolean;
  onItemClick: (itemId: number) => void;
}

export const WishlistItems: FC<WishlistItemsProps> = ({items, isFriendList, isLoading, onItemClick,}) => {
  if (isLoading) {
    return <Loading/>;
  }

  if (items.length === 0) {
    return <Cell>No items in this wishlist yet</Cell>
  }

  return items.map((item) => (
    <Cell
      key={item.id}
      onClick={() => onItemClick(item.id!)}
      after={<Navigation/>}
      disabled={isFriendList && item.reserved_by !== undefined}
    >
      {item.title}
    </Cell>
  ))


  // </Section>;
};
