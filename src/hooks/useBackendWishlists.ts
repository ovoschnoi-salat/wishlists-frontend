import {useState, useEffect} from 'react';
import {getApiUserWishlists, ServiceWishlist, SubcodeErrorsResponse} from '@/backend-client';
import {loadResult} from "@/hooks/loaderProps.ts";

export const useBackendWishlists = (): loadResult & { wishlists: ServiceWishlist[] } => {
  const [data, setData] = useState<ServiceWishlist[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<SubcodeErrorsResponse | undefined>();

  const fetch = async () => {
    try {
      setIsLoading(true);

      const {data, error} = await getApiUserWishlists({});

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
  }, []);

  return {
    wishlists: data,
    isLoading: isLoading,
    error: error,
    resetError: setError,
    refetch: fetch,
  };
};
