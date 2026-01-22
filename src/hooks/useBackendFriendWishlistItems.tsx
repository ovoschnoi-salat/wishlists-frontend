import {useState, useEffect, useCallback} from 'react';
import {
  getApiUserFriendWishlistItems,
  ServiceFriendWishlistItem,
} from '@/backend-client';
import {loadResult} from "@/hooks/loaderProps.ts";
import {toast} from "react-hot-toast";
import {ToastBackendError} from "@/components/ToastBackendError/ToastBackendError.tsx";

export const useBackendFriendWishlistItems = (wishlistId: number): loadResult & { items: ServiceFriendWishlistItem[] } => {
  const [data, setData] = useState<ServiceFriendWishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetch = useCallback(async () => {
    try {
      setIsLoading(true);

      const {data, error} = await getApiUserFriendWishlistItems({
        query: {wishlist_id: wishlistId}
      });

      if (error) {
        setData([]);
        toast.error(<ToastBackendError error={error}/>)
        return;
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
