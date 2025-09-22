import {
  Cell,
  Text,
  Section, Navigation, Placeholder
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';
import {useNavigate} from "react-router-dom";
import {ServiceWishlistItem} from '@/backend-client';

// Use the ServiceWishlistItem type from backend-client
export type WishlistItem = ServiceWishlistItem;

interface WishlistItemsProps {
  items: WishlistItem[];
  isLoading: boolean;
}

export const WishlistItems: FC<WishlistItemsProps> = ({
                                                        items,
                                                        isLoading,
                                                      }) => {
  let navigate = useNavigate()
  const handleItemPress = (itemId: number | undefined) => {
    navigate(`/wishlists/item/${itemId}`)
  };

  if (isLoading) {
    return (
      <Placeholder
        description="Loading items..."
      >
        <img
          alt="Telegram sticker"
          className="blt0jZBzpxuR4oDhJc8s"
          src="https://xelene.me/telegram.gif"
        />
      </Placeholder>
    );
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
          onClick={() => handleItemPress(item.id)}
          after={<Navigation/>}
        >
          {item.title || 'Untitled Item'}
        </Cell>
      ))
    )}
  </Section>;
};
