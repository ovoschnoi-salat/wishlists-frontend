import {List} from '@telegram-apps/telegram-ui';
import {postApiUserWishlist, ServiceCreateWishlistRequest, SubcodeErrorsResponse} from '@/backend-client';
import {FC, memo, useState} from 'react';
import {useNavigate} from "react-router";

import {Page} from "@/components/Page.tsx";
import {useBackendFriends} from "@/hooks/useBackendFriends.ts";
import {EditWishlist} from "@/components/EditWishlist/EditWishlist.tsx";
import {BackendErrorHandler} from "@/components/BackendErrorHandler/BackendErrorHandler.tsx";

export const NewWishlistPage: FC = memo(function NewWishlistPage() {
  const navigate = useNavigate()
  const [createWishlistError, setCreateWishlistError] = useState<SubcodeErrorsResponse | undefined>()

  const {friends, isLoading, error, resetError} = useBackendFriends();

  const handleSaveNewWishlist = async (newWishlist: ServiceCreateWishlistRequest) => {
    const {data, error} = await postApiUserWishlist({body: newWishlist});

    if (error) {
      setCreateWishlistError(error)
      return
    }

    navigate(`/wishlist/${data!.id!}/items`, {replace: true, state: data})
  };

  return <Page pageTitle={"New wishlist"}>
    <BackendErrorHandler error={error} resetError={resetError}/>
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
});
