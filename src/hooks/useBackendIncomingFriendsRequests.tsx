import {useState, useEffect, useCallback} from 'react';
import {getApiUserFriendsRequestsIncoming, ServiceFriend} from '@/backend-client';
import {loadResult} from "@/hooks/loaderProps.ts";
import {toast} from "react-hot-toast";
import {ToastBackendError} from "@/components/ToastBackendError/ToastBackendError.tsx";

export const useBackendIncomingFriendsRequests = (): loadResult & {
  friends: ServiceFriend[];
  setFriends: (friends: ServiceFriend[]) => void;
} => {
  const [data, setData] = useState<ServiceFriend[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetch = useCallback(async () => {
    try {
      setIsLoading(true);

      const {data, error} = await getApiUserFriendsRequestsIncoming({});

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
    setFriends: setData,
    isLoading: isLoading,
    refetch: fetch,
  };
};
