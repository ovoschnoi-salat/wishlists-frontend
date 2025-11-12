import { useState, useEffect } from 'react';
import { getApiUserWishlistAccess } from '@/backend-client';

interface LoadWishlistAccessListResult {
  accessList: number[];
  isLoading: boolean;
  refetch: () => Promise<void>;
}

export const loadWishlistAccessList = (wishlistId: number): LoadWishlistAccessListResult => {
  const [accessList, setAccessList] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetch = async () => {
    try {
      setIsLoading(true);

      const { data, error: apiError } = await getApiUserWishlistAccess({query: {
        wishlist_id: wishlistId!
        }});

      if (apiError) {
        setAccessList([])
        return
      }

      setAccessList(data || []);
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return {
    accessList: accessList,
    isLoading,
    refetch: fetch,
  };
};
