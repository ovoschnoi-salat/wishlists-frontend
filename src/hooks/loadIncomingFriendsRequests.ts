import {useState, useEffect} from 'react';
import {getApiUserFriendsRequestsIncoming, ServiceFriend, SubcodeErrorsResponse} from '@/backend-client';
import {loadResult} from "@/hooks/loaderProps.ts";

export const loadIncomingFriendsRequests = (): loadResult & {
  friends: ServiceFriend[];
  setFriends: (friends: ServiceFriend[]) => void;
} => {
  const [data, setData] = useState<ServiceFriend[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<SubcodeErrorsResponse | undefined>();

  const fetch = async () => {
    try {
      setIsLoading(true);

      const {data, error} = await getApiUserFriendsRequestsIncoming({});

      setError(error);
      if (error) {
        setData([]);
        return
      }

      setData(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return {
    friends: data,
    setFriends: setData,
    isLoading: isLoading,
    error: error,
    resetError: setError,
    refetch: fetch,
  };
};
