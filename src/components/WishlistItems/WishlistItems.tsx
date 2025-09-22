import {
  Cell,
  Button,
  Text,
  List,
  Section, Navigation
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';
import {useNavigate} from "react-router-dom";
import {ServiceWishlistItem} from '@/backend-client';
import {loadWishlistItems} from '@/hooks/loadWishlistItems.ts';
import {Icon28Plus} from "@/icons/28/Plus.tsx";

// Use the ServiceWishlistItem type from backend-client
export type WishlistItem = ServiceWishlistItem;

interface WishlistItemsProps {
  wishlistId: number;
  onAddItem?: () => void;
}

export const WishlistItems: FC<WishlistItemsProps> = ({
                                                        wishlistId,
                                                        onAddItem,
                                                      }) => {
  const {items, isLoading, error} = loadWishlistItems(wishlistId);
  let navigate = useNavigate()
  const handleItemPress = (itemId: number | undefined) => {
    navigate(`/wishlists/item/${itemId}`)
  };

  const handleAddItem = () => {
    onAddItem?.();
  };

  if (isLoading) {
    return (
      <Text>Loading items...</Text>
    );
  }

  if (error) {
    // Surface API errors to the nearest ErrorBoundary
    throw new Error(typeof error === 'string' ? error : 'Unknown error' + error);
  }

  return (<List>
      <Section
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
      </Section>
      {/* Add Item Button */}
      <Section>
        <Button
          mode="filled"
          size="m"
          stretched
          onClick={handleAddItem}
          before={<Icon28Plus/>}
        >
          Add wish
        </Button>
      </Section>
    </List>
  );
};
