import {
  List,
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';

import {NewWishlist} from '@/components/NewWishlist/NewWishlist.tsx';
import {postApiUserWishlist, ServiceCreateWishlistRequest} from '@/backend-client';
import {Page} from "@/components/Page.tsx";
import {useNavigate} from "react-router-dom";
import {loadFriends} from "@/hooks/loadFriends.ts";

export const NewWishlistPage: FC = () => {
  const {friends, isLoading} = loadFriends();

  const navigate = useNavigate()

  const handleSaveNewWishlist = async (newWishlist: ServiceCreateWishlistRequest) => {
    const {data, error} = await postApiUserWishlist({body: newWishlist});

    if (error) {
      throw error
    }

    navigate(`/wishlist/${data?.id!}/items`)
  };


  return <Page>
    <List>
      <NewWishlist onSave={handleSaveNewWishlist} friends={friends} isLoadingFriends={isLoading}/>
    </List>
  </Page>
};
