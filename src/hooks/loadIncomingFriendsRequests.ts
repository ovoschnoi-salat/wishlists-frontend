import { useState, useEffect } from 'react';
import {getApiUserFriendsRequestsIncoming, ServiceFriend} from '@/backend-client';

export interface LoadIncomingFriendsRequestsResult {
  friends: ServiceFriend[];
  setFriends: (friends: ServiceFriend[]) => void;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

export const loadIncomingFriendsRequests = (): LoadIncomingFriendsRequestsResult => {
  const [friends, setFriends] = useState<ServiceFriend[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetch = async () => {
    try {
      setIsLoading(true);

      const { data, error: apiError } = await getApiUserFriendsRequestsIncoming({});

      if (apiError) {
        setFriends([])
        return
      }

      setFriends(data || []);
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
    friends: friends,
    setFriends: setFriends,
    isLoading,
    refetch: fetch,
  };
};
