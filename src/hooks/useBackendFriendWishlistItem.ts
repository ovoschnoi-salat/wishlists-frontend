import {useState, useEffect, useCallback} from 'react';
import {
  getApiUserFriendWishlistItem,
  ServiceFriendWishlistItem, SubcodeErrorsResponse
} from '@/backend-client';
import {loadResult} from "@/hooks/loaderProps.ts";

export const useBackendFriendWishlistItem = (wish: ServiceFriendWishlistItem | undefined): loadResult & { item: ServiceFriendWishlistItem | undefined } => {
  const [data, setData] = useState<ServiceFriendWishlistItem | undefined>(wish);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<SubcodeErrorsResponse | undefined>();

  const fetch = useCallback(async () => {
    if (!wish) {
      return
    }

    try {
      setIsLoading(true);

      const {data, error} = await getApiUserFriendWishlistItem({
        query: {
          wish_id: wish.id!,
        }
      });

      setError(error);
      if (error) {
        setData(undefined);
        return;
      }

      setData(data);
    } finally {
      setIsLoading(false);
    }
  }, [wish]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    item: data,
    isLoading: isLoading,
    error: error,
    resetError: setError,
    refetch: fetch,
  };
};
