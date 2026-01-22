import {useState, useEffect, useCallback} from 'react';
import {
  getApiUserFriendWishlists,
  ServiceFriendWishlist,
} from '@/backend-client';
import {loadResult} from "@/hooks/loaderProps.ts";
import {toast} from "react-hot-toast";
import {ToastBackendError} from "@/components/ToastBackendError/ToastBackendError.tsx";

export const useBackendFriendWishlists = (friendId: number): loadResult & { wishlists: ServiceFriendWishlist[] } => {
  const [data, setData] = useState<ServiceFriendWishlist[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetch = useCallback(async () => {
    try {
      setIsLoading(true);

      const {data, error} = await getApiUserFriendWishlists({
        query: {
          friend_id: friendId
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
  }, [friendId]);

  useEffect(() => {
    fetch();
  }, [fetch, friendId]);

  return {
    wishlists: data,
    isLoading: isLoading,
    refetch: fetch,
  };
};
