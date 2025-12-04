import {useState, useEffect, useCallback} from 'react';
import {
  getApiUserFriendWishlists,
  ServiceFriendWishlist,
  SubcodeErrorsResponse
} from '@/backend-client';
import {loadResult} from "@/hooks/loaderProps.ts";

export const useBackendFriendWishlists = (friendId: number): loadResult & {wishlists: ServiceFriendWishlist[]} => {
  const [data, setData] = useState<ServiceFriendWishlist[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<SubcodeErrorsResponse | undefined>();

  const fetch = useCallback(async () => {
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
  }, [friendId]);

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
