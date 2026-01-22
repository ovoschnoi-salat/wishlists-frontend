import {useState, useEffect, useCallback} from 'react';
import {getApiUserFriendsRequestsIncomingCount} from '@/backend-client';
import {loadResult} from "@/hooks/loaderProps.ts";
import {toast} from "react-hot-toast";
import {ToastBackendError} from "@/components/ToastBackendError/ToastBackendError.tsx";

export const useBackendIncomingFriendsRequestsCount = (): loadResult & {requestsCount: number} => {
  const [data, setData] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetch = useCallback(async () => {
    try {
      setIsLoading(true);

      const { data, error } = await getApiUserFriendsRequestsIncomingCount({});

      if (error) {
        setData(0);
        toast.error(<ToastBackendError error={error}/>)
        return
      }

      setData(data!.count!);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    requestsCount: data,
    isLoading: isLoading,
    refetch: fetch,
  };
};
