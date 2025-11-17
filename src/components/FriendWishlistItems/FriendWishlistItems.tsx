import {
  Cell,
  Navigation
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';
import {ServiceFriendWishlistItem} from '@/backend-client';
import {Loading} from "@/components/Loading.tsx";

export type WishlistItem = ServiceFriendWishlistItem;

interface FriendWishlistItemsProps {
  items: WishlistItem[];
  isLoading: boolean;
  onItemClick: (item: WishlistItem) => void;
}

export const FriendWishlistItems: FC<FriendWishlistItemsProps> = ({items, isLoading, onItemClick}) => {
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
      disabled={item.reserved === true && item.reservation_can_be_canceled === false}
    >
      {item.title}
    </Cell>
  ))
};
