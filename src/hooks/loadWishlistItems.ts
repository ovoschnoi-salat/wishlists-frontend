import { useState, useEffect } from 'react';
import { getUserWishlistItems, ServiceWishlistItem } from '@/backend-client';

interface LoadWishlistItemsResult {
  items: ServiceWishlistItem[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const loadWishlistItems = (wishlistId: number | null): LoadWishlistItemsResult => {
  const [items, setItems] = useState<ServiceWishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    if (!wishlistId) {
      setItems([]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error: apiError } = await getUserWishlistItems({
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
    fetchItems();
  }, [wishlistId]);

  return {
    items,
    isLoading,
    error,
    refetch: fetchItems,
  };
};
