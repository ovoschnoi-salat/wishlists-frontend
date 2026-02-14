import {useState, useEffect, useCallback} from 'react';
import {getApiUserWishlistAccess} from '@/backend-client';
import {loadResult} from "@/hooks/loaderProps.ts";
import {toast} from "react-hot-toast";
import {ToastBackendError} from "@/components/ToastBackendError/ToastBackendError.tsx";

export const useBackendWishlistAccessList = (wishlistId: number): loadResult & { accessList: number[] } => {
  const [data, setData] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetch = useCallback(async () => {
    try {
      setIsLoading(true);

      const {data, error} = await getApiUserWishlistAccess({
        query: {
          wishlist_id: wishlistId!
        }
      });

      if (error) {
        setData([]);
        toast.error(<ToastBackendError error={error}/>)
        return
      }
      setData(data);
    } finally {
      setIsLoading(false);
    }
  }, [wishlistId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    accessList: data,
    isLoading: isLoading,
    refetch: fetch,
  };
};
