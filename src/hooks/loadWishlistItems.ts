import {useState, useEffect} from 'react';
import {getApiUserWishlistItems, ServiceWishlistItem, SubcodeErrorsResponse} from '@/backend-client';
import {loadResult} from "@/hooks/loaderProps.ts";

export const loadWishlistItems = (wishlistId: number): loadResult & { items: ServiceWishlistItem[] } => {
  const [data, setData] = useState<ServiceWishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<SubcodeErrorsResponse | undefined>();

  const fetch = async () => {
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
  };

  useEffect(() => {
    fetch();
  }, [wishlistId]);

  return {
    items: data,
    isLoading: isLoading,
    error: error,
    resetError: setError,
    refetch: fetch,
  };
};
