import {useState, useEffect} from 'react';
import {
  getApiUserFriendWishlistItems,
  ServiceFriendWishlistItem, SubcodeErrorsResponse
} from '@/backend-client';
import {loadResult} from "@/hooks/loaderProps.ts";

export const loadFriendWishlistItems = (wishlistId: number): loadResult & { items: ServiceFriendWishlistItem[] } => {
  const [data, setData] = useState<ServiceFriendWishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<SubcodeErrorsResponse | undefined>();

  const fetch = async () => {
    try {
      setIsLoading(true);

      const {data, error} = await getApiUserFriendWishlistItems({
        query: {wishlist_id: wishlistId}
      });

      setError(error);
      if (error) {
        setData([]);
        return;
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
