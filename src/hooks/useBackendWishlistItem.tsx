import {useCallback, useEffect, useState} from 'react';
import {getApiUserWishlistItem, ServiceWishlistItem} from '@/backend-client';
import {useLocation} from "react-router";
import {loadResult} from "@/hooks/loaderProps.ts";
import {toast} from "react-hot-toast";
import {ToastBackendError} from "@/components/ToastBackendError/ToastBackendError.tsx";

export const useBackendWishlistItem = (itemId: number): loadResult & {item: ServiceWishlistItem} => {
  const {state} = useLocation()
  const itemFromState = state as ServiceWishlistItem | undefined

  const [data, setData] = useState<ServiceWishlistItem>(itemFromState ?? {});
  const [isLoading, setIsLoading] = useState(false);

  const fetch = useCallback(async () => {
    try {
      setIsLoading(true);

      const {data, error} = await getApiUserWishlistItem({
        query: {item_id: itemId}
      });

      if (error) {
        setData({});
        toast.error(<ToastBackendError error={error}/>)
        return
      }

      setData(data);
    } finally {
      setIsLoading(false);
    }
  }, [itemId]);

  useEffect(() => {
    if (itemFromState === undefined || itemFromState?.id !== itemId) {
      fetch();
    }
  }, [fetch, itemFromState, itemId]);

  return {
    item: data,
    isLoading: isLoading,
    refetch: fetch,
  };
};
