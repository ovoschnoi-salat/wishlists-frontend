import {List} from '@telegram-apps/telegram-ui';
import {postApiUserWishlist, ServiceCreateWishlistRequest, SubcodeErrorsResponse} from '@/backend-client';
import {FC, useState} from 'react';
import {useNavigate} from "react-router";

import {Page} from "@/components/Page.tsx";
import {loadFriends} from "@/hooks/loadFriends.ts";
import {EditWishlist} from "@/components/EditWishlist/EditWishlist.tsx";
import {BackendErrorHandler} from "@/components/BackendErrorHandler/BackendErrorHandler.tsx";

export const NewWishlistPage: FC = () => {
  const [createWishlistError, setCreateWishlistError] = useState<SubcodeErrorsResponse | undefined>()

  const {friends, isLoading} = loadFriends();

  const navigate = useNavigate()

  const handleSaveNewWishlist = async (newWishlist: ServiceCreateWishlistRequest) => {
    const {data, error} = await postApiUserWishlist({body: newWishlist});

    if (error) {
      setCreateWishlistError(error)
      return
    }

    navigate(`/wishlist/${data!.id!}/items`, {state: data})
  };


  return <Page pageTitle={"New wishlist"}>
    <BackendErrorHandler error={createWishlistError} resetError={setCreateWishlistError}/>
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
