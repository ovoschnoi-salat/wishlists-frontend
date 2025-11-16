import { useState, useEffect } from 'react';
import {
  getApiUserFriendsRequestsIncomingCount, SubcodeErrorsResponse
} from '@/backend-client';
import {loadResult} from "@/hooks/loaderProps.ts";


export const loadIncomingFriendsRequestsCount = (): loadResult & {requestsCount: number} => {
  const [data, setData] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<SubcodeErrorsResponse | undefined>();

  const fetch = async () => {
    try {
      setIsLoading(true);

      const { data, error } = await getApiUserFriendsRequestsIncomingCount({});

      setError(error);
      if (error) {
        setData(0);
        return
      }

      setData(data!.count!);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return {
    requestsCount: data,
    isLoading: isLoading,
    error: error,
    resetError: setError,
    refetch: fetch,
  };
};
