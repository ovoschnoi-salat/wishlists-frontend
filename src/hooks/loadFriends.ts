import { useState, useEffect } from 'react';
import { getUserFriends, ServiceFriend } from '@/backend-client';

interface LoadFriendsResult {
  friends: ServiceFriend[];
  isLoading: boolean;
  refetch: () => Promise<void>;
}

export const loadFriends = (): LoadFriendsResult => {
  const [friends, setFriends] = useState<ServiceFriend[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLists = async () => {
    try {
      setIsLoading(true);

      const { data, error: apiError } = await getUserFriends({});

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
    fetchLists();
  }, []);

  return {
    friends: friends,
    isLoading,
    refetch: fetchLists,
  };
};
