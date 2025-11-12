import {
  ButtonCell,
  List, Section,
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';

import {
  deleteApiUserWishlist,
  patchApiUserWishlist,
  ServiceCreateWishlistRequest,
  ServiceWishlist
} from '@/backend-client';
import {Page} from "@/components/Page.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {loadFriends} from "@/hooks/loadFriends.ts";
import {loadWishlistAccessList} from "@/hooks/loadWishlistAccessList.ts";
import {EditWishlist} from "@/components/EditWishlist/EditWishlist.tsx";
import {Loading} from "@/components/Loading.tsx";

const loadState = () => {
  let {state} = useLocation()
  return state as ServiceWishlist
}

export const EditWishlistPage: FC = () => {
  const wishlist = loadState()

  const {friends, isLoading} = loadFriends();

  const WishlistAccessList = loadWishlistAccessList(wishlist.id!)

  const navigate = useNavigate()

  const handleDeleteWishlist = async () => {
    const {error} = await deleteApiUserWishlist({
      query: {wishlist_id: wishlist.id!}
    });

    if (error) {
      throw error
    }

    navigate(`/`)
  };

  const handleSaveWishlist = async (newWishlist: ServiceCreateWishlistRequest) => {
    const {data, error} = await patchApiUserWishlist({
      body: newWishlist,
      query: {wishlist_id: wishlist.id!}
    });

    if (error) {
      throw error
    }

    navigate(`/wishlist/${wishlist.id!}/items`, {state: data})
  };


  if (isLoading || WishlistAccessList.isLoading) {
    return <Loading/>;
  }

  return <Page>
    <List>
      <EditWishlist wishlist={wishlist} friendsWithAccess={WishlistAccessList.accessList} onSave={handleSaveWishlist} friends={friends}
                    isLoadingFriends={isLoading}/>
      <Section>
        <ButtonCell
          mode={"destructive"}
          onClick={handleDeleteWishlist}
        >
          Delete Wishlist
        </ButtonCell>
      </Section>
    </List>
  </Page>
};
