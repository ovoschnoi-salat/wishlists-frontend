import {useState, useEffect, useCallback} from 'react';
import {
  getApiUserFriendWishlistItem,
  ServiceFriendWishlistItem,
} from '@/backend-client';
import {loadResult} from "@/hooks/loaderProps.ts";
import {toast} from "react-hot-toast";
import {ToastBackendError} from "@/components/ToastBackendError/ToastBackendError.tsx";

export const useBackendFriendWishlistItem = (wish: ServiceFriendWishlistItem | undefined): loadResult & { item: ServiceFriendWishlistItem | undefined } => {
  const [data, setData] = useState<ServiceFriendWishlistItem | undefined>(wish);
  const [isLoading, setIsLoading] = useState(false);

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

      if (error) {
        setData(undefined);
        toast.error(<ToastBackendError error={error}/>)
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
    refetch: fetch,
  };
};
