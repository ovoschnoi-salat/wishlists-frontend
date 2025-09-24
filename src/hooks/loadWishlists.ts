import { useState, useEffect } from 'react';
import { getUserWishlists, ServiceWishlist } from '@/backend-client';

interface LoadWishlistsResult {
  wishlists: ServiceWishlist[];
  isLoading: boolean;
  refetch: () => Promise<void>;
}

export const loadWishlists = (): LoadWishlistsResult => {
  const [wishlists, setWishlists] = useState<ServiceWishlist[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLists = async () => {
    try {
      setIsLoading(true);

      const { data, error: apiError } = await getUserWishlists({});

      if (apiError) {
        setWishlists([])
        return
      }

      setWishlists(data || []);
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
    wishlists: wishlists,
    isLoading,
    refetch: fetchLists,
  };
};
