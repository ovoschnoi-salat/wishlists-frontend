import {useCallback, useState} from 'react';
import {getApiUserWishlistItem, ServiceWishlistItem} from '@/backend-client';
import {loadResult} from "@/hooks/loaderProps.ts";
import {toast} from "react-hot-toast";
import {ToastBackendError} from "@/components/ToastBackendError/ToastBackendError.tsx";

export const useBackendWishlistItem = (item: ServiceWishlistItem): loadResult & {item: ServiceWishlistItem} => {
  const [data, setData] = useState<ServiceWishlistItem>(item);
  const [isLoading, setIsLoading] = useState(false);

  const fetch = useCallback(async () => {
    try {
      setIsLoading(true);

      const {data, error} = await getApiUserWishlistItem({
        query: {item_id: item.id!}
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
  }, [item]);

  return {
    item: data,
    isLoading: isLoading,
    refetch: fetch,
  };
};
