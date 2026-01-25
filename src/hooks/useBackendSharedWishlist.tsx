import {useState, useEffect, useCallback} from 'react';
import {getApiSharedWishlist, ServiceWishlist} from '@/backend-client';
import {loadResult} from "@/hooks/loaderProps.ts";
import {toast} from "react-hot-toast";
import {ToastBackendError} from "@/components/ToastBackendError/ToastBackendError.tsx";
import {sleep} from "@/components/utils.ts";

export const useBackendSharedWishlist = (wishlist_uuid: string): loadResult & { wishlist: ServiceWishlist | undefined } => {
  const [data, setData] = useState<ServiceWishlist | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const fetch = useCallback(async () => {
    try {
      setIsLoading(true);
      sleep(4000)

      const {data, error} = await getApiSharedWishlist({
        query: {
          wishlist_uuid: wishlist_uuid
        }
      });

      if (error) {
        setData(undefined);
        toast.error(<ToastBackendError error={error}/>)
        return
      }

      console.log("received shared wishlist", data)

      setData(data);
    } finally {
      setIsLoading(false);
    }
  }, [wishlist_uuid]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    wishlist: data,
    isLoading: isLoading,
    refetch: fetch,
  };
};
