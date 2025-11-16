import { useState, useEffect } from 'react';
import {getApiUserFriendWishlists, ServiceWishlist, SubcodeErrorsResponse} from '@/backend-client';
import {loadResult} from "@/hooks/loaderProps.ts";

export const loadFriendWishlists = (friendId: number): loadResult & {wishlists: ServiceWishlist[]} => {
  const [data, setData] = useState<ServiceWishlist[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<SubcodeErrorsResponse | undefined>();

  const fetch = async () => {
    try {
      setIsLoading(true);

      const { data, error } = await getApiUserFriendWishlists({
        query: {
          friend_id: friendId
        }
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
  }, [friendId]);

  return {
    wishlists: data,
    isLoading: isLoading,
    error: error,
    resetError: setError,
    refetch: fetch,
  };
};
