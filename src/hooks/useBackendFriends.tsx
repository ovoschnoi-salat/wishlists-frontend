import {useCallback, useEffect, useState} from 'react';
import {getApiUserFriends, ServiceFriend} from '@/backend-client';
import {loadResult} from "@/hooks/loaderProps.ts";
import {toast} from "react-hot-toast";
import {ToastBackendError} from "@/components/ToastBackendError/ToastBackendError.tsx";

export const useBackendFriends = (): loadResult & { friends: ServiceFriend[] } => {
  const [data, setData] = useState<ServiceFriend[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetch = useCallback(async () => {
    try {
      setIsLoading(true);

      const {data, error} = await getApiUserFriends({});

      if (error) {
        setData([]);
        toast.error(<ToastBackendError error={error}/>)
        return
      }

      setData(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    friends: data,
    isLoading: isLoading,
    refetch: fetch,
  };
};
