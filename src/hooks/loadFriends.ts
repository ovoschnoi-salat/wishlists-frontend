import {useEffect, useState} from 'react';
import {getApiUserFriends, ServiceFriend, SubcodeErrorsResponse} from '@/backend-client';
import {loadResult} from "@/hooks/loaderProps.ts";

export const loadFriends = (): loadResult & { friends: ServiceFriend[] } => {
  const [data, setData] = useState<ServiceFriend[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<SubcodeErrorsResponse | undefined>();

  const fetch = async () => {
    try {
      setIsLoading(true);

      const {data, error} = await getApiUserFriends({});

      setError(error)
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
    isLoading: isLoading,
    error: error,
    resetError: setError,
    refetch: fetch,
  };
};
