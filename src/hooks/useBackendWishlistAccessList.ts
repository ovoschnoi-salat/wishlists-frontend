import {useState, useEffect} from 'react';
import {getApiUserWishlistAccess, SubcodeErrorsResponse} from '@/backend-client';
import {loadResult} from "@/hooks/loaderProps.ts";

export const useBackendWishlistAccessList = (wishlistId: number): loadResult & { accessList: number[] } => {
  const [data, setData] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<SubcodeErrorsResponse | undefined>();

  const fetch = async () => {
    try {
      setIsLoading(true);

      const {data, error} = await getApiUserWishlistAccess({
        query: {
          wishlist_id: wishlistId!
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
  }, [wishlistId]);

  return {
    accessList: data,
    isLoading: isLoading,
    error: error,
    resetError: setError,
    refetch: fetch,
  };
};
