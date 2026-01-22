import {useState, useEffect, useCallback} from 'react';
import {getApiUserWishlists, ServiceWishlist} from '@/backend-client';
import {loadResult} from "@/hooks/loaderProps.ts";
import {toast} from "react-hot-toast";
import {ToastBackendError} from "@/components/ToastBackendError/ToastBackendError.tsx";

export const useBackendWishlists = (): loadResult & { wishlists: ServiceWishlist[] } => {
  const [data, setData] = useState<ServiceWishlist[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetch = useCallback(async () => {
    try {
      setIsLoading(true);

      const {data, error} = await getApiUserWishlists({});

      if (error) {
        setData([]);
        toast.error(<ToastBackendError error={error}/>)
        return
      }

      setData(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    wishlists: data,
    isLoading: isLoading,
    refetch: fetch,
  };
};
