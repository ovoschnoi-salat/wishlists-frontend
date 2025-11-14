import {useEffect, useState} from 'react';
import {getApiUserWishlistItem, ServiceWishlistItem} from '@/backend-client';
import {useLocation} from "react-router";

interface UseWishlistItemsResult {
  item: ServiceWishlistItem;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const loadWishlistItem = (itemId: number): UseWishlistItemsResult => {
  const {state} = useLocation()
  const itemFromState = state as ServiceWishlistItem | undefined

  const [item, setItem] = useState<ServiceWishlistItem>(itemFromState ?? {});
  const [shouldBeLoaded, setShouldBeLoaded] = useState(itemFromState === undefined || itemFromState?.id !== itemId);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = async () => {
    setShouldBeLoaded(true);
    try {
      setIsLoading(true);
      setError(null);

      const {data, error: apiError} = await getApiUserWishlistItem({
        query: {item_id: itemId}
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
    if (shouldBeLoaded) {
      fetch();
    }
  }, [itemId]);

  return {
    item,
    isLoading,
    error,
    refetch: fetch,
  };
};
