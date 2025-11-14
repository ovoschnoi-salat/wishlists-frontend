import {
  List,
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';

import {postApiUserWishlist, ServiceCreateWishlistRequest} from '@/backend-client';
import {Page} from "@/components/Page.tsx";
import {useNavigate} from "react-router-dom";
import {loadFriends} from "@/hooks/loadFriends.ts";
import {EditWishlist} from "@/components/EditWishlist/EditWishlist.tsx";

export const NewWishlistPage: FC = () => {
  const {friends, isLoading} = loadFriends();

  const navigate = useNavigate()

  const handleSaveNewWishlist = async (newWishlist: ServiceCreateWishlistRequest) => {
    const {data, error} = await postApiUserWishlist({body: newWishlist});

    if (error) {
      throw error
    }

    navigate(`/wishlist/${data?.id!}/items`, {state: data})
  };


  return <Page>
    <List>
      <EditWishlist
        onSave={handleSaveNewWishlist}
        friends={friends}
        isLoadingFriends={isLoading}
        wishlist={{
          description: "",
          id: undefined,
          is_private: false,
          title: ""
        }}
        friendsWithAccess={[]}
      />
    </List>
  </Page>
};
