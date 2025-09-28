import { useState, useEffect } from 'react';
import {getApiUserWishlistItem, ServiceWishlistItem} from '@/backend-client';

interface UseWishlistItemsResult {
  item: ServiceWishlistItem;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const loadWishlistItem = (itemId: number | null): UseWishlistItemsResult => {
  const [item, setItem] = useState<ServiceWishlistItem>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItem = async () => {
    if (!itemId) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error: apiError } = await getApiUserWishlistItem({
        query: { item_id: itemId }
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

      setItem(data || {});
    } catch (err) {
      console.error('Failed to load wishlist items', err);
      setError((err as Error)?.message ?? 'Failed to load items');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItem();
  }, [itemId]);

  return {
    item,
    isLoading,
    error,
    refetch: fetchItem,
  };
};
