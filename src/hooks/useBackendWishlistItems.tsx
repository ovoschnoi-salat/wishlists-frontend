import {useState, useEffect, useCallback} from 'react';
import {getApiUserWishlistItems, ServiceWishlistItem} from '@/backend-client';
import {loadResult} from "@/hooks/loaderProps.ts";
import {toast} from "react-hot-toast";
import {ToastBackendError} from "@/components/ToastBackendError/ToastBackendError.tsx";

export const useBackendWishlistItems = (wishlistId: number): loadResult & { items: ServiceWishlistItem[] } => {
  const [data, setData] = useState<ServiceWishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetch = useCallback(async () => {
    try {
      setIsLoading(true);

      const {data, error} = await getApiUserWishlistItems({
        query: {wishlist_id: wishlistId}
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
  }, [wishlistId, fetch]);

  return {
    items: data,
    isLoading: isLoading,
    refetch: fetch,
  };
};
