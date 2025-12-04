import {useState, useEffect, useCallback} from 'react';
import {getApiUserWishlistItems, ServiceWishlistItem, SubcodeErrorsResponse} from '@/backend-client';
import {loadResult} from "@/hooks/loaderProps.ts";

export const useBackendWishlistItems = (wishlistId: number): loadResult & { items: ServiceWishlistItem[] } => {
  const [data, setData] = useState<ServiceWishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<SubcodeErrorsResponse | undefined>();

  const fetch = useCallback(async () => {
    try {
      setIsLoading(true);

      const {data, error} = await getApiUserWishlistItems({
        query: {wishlist_id: wishlistId}
      });

      setError(error);
      if (error) {
        setData([]);
        return
      }

      setData(data);
    } finally {
      setIsLoading(false);
    }
  }, [wishlistId]);

  useEffect(() => {
    fetch();
  }, [wishlistId, fetch]);

  return {
    items: data,
    isLoading: isLoading,
    error: error,
    resetError: setError,
    refetch: fetch,
  };
};
