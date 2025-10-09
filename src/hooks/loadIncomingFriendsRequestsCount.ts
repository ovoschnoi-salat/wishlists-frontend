import { useState, useEffect } from 'react';
import {
  getApiUserFriendsRequestsIncomingCount
} from '@/backend-client';

export interface LoadIncomingFriendsRequestsCountResult {
  requestsCount: number ;
  isLoading: boolean;
}

export const loadIncomingFriendsRequestsCount = (): LoadIncomingFriendsRequestsCountResult => {
  const [requestsCount, setRequestsCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetch = async () => {
    try {
      setIsLoading(true);

      const { data, error: apiError } = await getApiUserFriendsRequestsIncomingCount({});

      if (apiError) {
        setRequestsCount(0)
        return
      }

      setRequestsCount(data?.count || 0);
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return {
    requestsCount: requestsCount,
    isLoading,
  };
};
