import { useState, useEffect } from 'react';
import { getUserWishlists, ServiceWishlist } from '@/backend-client';

interface LoadWishlistsResult {
  wishlists: ServiceWishlist[];
  isLoading: boolean;
  refetch: () => Promise<void>;
}

export const loadWishlists = (): LoadWishlistsResult => {
  const [items, setitems] = useState<ServiceWishlist[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLists = async () => {
    try {
      setIsLoading(true);

      const { data, error: apiError } = await getUserWishlists({});

      if (apiError) {
        setitems([])
        throw apiError;
      }

      setitems(data || []);
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  return {
    wishlists: items,
    isLoading,
    refetch: fetchLists,
  };
};
