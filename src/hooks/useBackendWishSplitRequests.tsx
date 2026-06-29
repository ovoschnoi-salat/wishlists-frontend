import {useState, useEffect, useCallback} from 'react';
import {
  getApiUserWishlistItemSplitRequests,
  ServiceGetSplitRequestsResponse,
} from '@/backend-client';
import {loadResult} from "@/hooks/loaderProps.ts";
import {toast} from "react-hot-toast";
import {ToastBackendError} from "@/components/ToastBackendError/ToastBackendError.tsx";

export const useBackendWishSplitRequests = (wishId: number): loadResult & { split_requests: ServiceGetSplitRequestsResponse } => {
  const [data, setData] = useState<ServiceGetSplitRequestsResponse>({});
  const [isLoading, setIsLoading] = useState(true);

  const fetch = useCallback(async () => {
    try {
      setIsLoading(true);

      const {data, error} = await getApiUserWishlistItemSplitRequests({
        query: {
          item_id: wishId,
        }
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
  }, [wishId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    split_requests: data,
    isLoading: isLoading,
    refetch: fetch,
  };
};
