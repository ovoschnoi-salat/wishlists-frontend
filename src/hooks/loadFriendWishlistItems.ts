import { useState, useEffect } from 'react';
import {
  getApiUserFriendWishlistItems,
  ServiceFriendWishlistItem
} from '@/backend-client';

interface LoadWishlistItemsResult {
  items: ServiceFriendWishlistItem[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const loadFriendWishlistItems = (wishlistId: number): LoadWishlistItemsResult => {
  const [items, setItems] = useState<ServiceFriendWishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error: apiError } = await getApiUserFriendWishlistItems({
        query: { wishlist_id: wishlistId }
      });

      if (apiError) {
        console.error('Failed to load wishlist items', apiError);
        setError(
          typeof apiError === 'string'
            ? apiError
            : (apiError as any)?.message ?? 'Failed to load items'
        );
        return;
      }

      setItems(data || []);
    } catch (err) {
      console.error('Failed to load wishlist items', err);
      setError((err as Error)?.message ?? 'Failed to load items');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [wishlistId]);

  return {
    items,
    isLoading,
    error,
    refetch: fetch,
  };
};
