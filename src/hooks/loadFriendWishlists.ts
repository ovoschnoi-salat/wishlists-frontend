import { useState, useEffect } from 'react';
import {getUserFriendWishlists, ServiceFriend, ServiceFriendWishlist} from '@/backend-client';

interface LoadFriendWishlistsResult {
  wishlists: ServiceFriend[];
  isLoading: boolean;
  refetch: () => Promise<void>;
}

export const loadFriendWishlists = (friendId: number | null): LoadFriendWishlistsResult => {
  const [wishlists, setFriendWishlists] = useState<ServiceFriendWishlist[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLists = async () => {
    if (!friendId) {
      setFriendWishlists([]);
      return;
    }

    try {
      setIsLoading(true);

      const { data, error: apiError } = await getUserFriendWishlists({
        query: {
          friend_id: friendId
        }
      });

      if (apiError) {
        setFriendWishlists([])
        return
      }

      setFriendWishlists(data || []);
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
    wishlists: wishlists,
    isLoading,
    refetch: fetchLists,
  };
};
