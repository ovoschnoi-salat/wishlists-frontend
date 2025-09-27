import {
  Cell,
  Text,
  Section, Navigation
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';
import {ServiceWishlistItem} from '@/backend-client';
import {Loading} from "@/components/Loading.tsx";

// Use the ServiceWishlistItem type from backend-client
export type WishlistItem = ServiceWishlistItem;

interface WishlistItemsProps {
  items: WishlistItem[];
  isLoading: boolean;
  onItemClick: (itemId: number) => void;
}

export const WishlistItems: FC<WishlistItemsProps> = ({items, isLoading, onItemClick,}) => {
  if (isLoading) {
    return <Loading/>;
  }

  return <Section
    header='Wishlist items'
  >
    {/* Items List */}
    {items.length === 0 ? (
      <Text className="wishlist-items__empty-text">
        No items in this wishlist yet
      </Text>
    ) : (
      items.map((item) => (
        <Cell
          key={item.id}
          onClick={() => onItemClick(item.id!)}
          after={<Navigation/>}
        >
          {item.title || 'Untitled Item'}
        </Cell>
      ))
    )}
  </Section>;
};
