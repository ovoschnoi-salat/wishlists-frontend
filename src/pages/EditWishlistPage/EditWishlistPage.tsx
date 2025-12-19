import {List} from '@telegram-apps/telegram-ui';
import {FC, memo, useState} from 'react';

import {
  deleteApiUserWishlist,
  patchApiUserWishlist,
  ServiceCreateWishlistRequest,
  ServiceWishlist, SubcodeErrorsResponse
} from '@/backend-client';
import {Page} from "@/components/Page.tsx";
import {useLocation, useNavigate} from "react-router";
import {useBackendFriends} from "@/hooks/useBackendFriends.ts";
import {useBackendWishlistAccessList} from "@/hooks/useBackendWishlistAccessList.ts";
import {EditWishlist} from "@/components/EditWishlist/EditWishlist.tsx";
import {BackendErrorHandler} from "@/components/BackendErrorHandler/BackendErrorHandler.tsx";

const useLocationState = () => {
  const {state} = useLocation()
  return state as ServiceWishlist
}

export const EditWishlistPage: FC = memo(function EditWishlistPage() {
  const navigate = useNavigate()
  const [deleteError, setDeleteError] = useState<SubcodeErrorsResponse | undefined>(undefined)
  const [saveError, setSaveError] = useState<SubcodeErrorsResponse | undefined>(undefined)

  const wishlist = useLocationState()

  const {friends, isLoading, error, resetError} = useBackendFriends();

  const WishlistAccessList = useBackendWishlistAccessList(wishlist.id!)


  const handleDeleteWishlist = async () => {
    const {error} = await deleteApiUserWishlist({
      query: {wishlist_id: wishlist.id!}
    });

    if (error) {
      setDeleteError(error)
      return
    }

    navigate(`/`)
  };

  const handleSaveWishlist = async (newWishlist: ServiceCreateWishlistRequest) => {
    const {data, error} = await patchApiUserWishlist({
      body: newWishlist,
      query: {wishlist_id: wishlist.id!}
    });

    if (error) {
      setSaveError(error)
      return
    }

    navigate(`../items`, {replace: true, relative: "path", state: data})
  };

  return <Page
    pageTitle={"Wishlist edit"}
    backNavFn={() => {
      navigate(`../items`, {replace: true, relative: "path", state: wishlist})
    }}>
    <BackendErrorHandler error={error} resetError={resetError}/>
    <BackendErrorHandler error={deleteError} resetError={setDeleteError}/>
    <BackendErrorHandler error={saveError} resetError={setSaveError}/>
    <List>
      <EditWishlist
        wishlist={wishlist}
        friendsWithAccess={WishlistAccessList.accessList}
        friends={friends}
        isLoadingFriends={isLoading || WishlistAccessList.isLoading}
        onSave={handleSaveWishlist}
        onDelete={handleDeleteWishlist}
      />
    </List>
  </Page>
});
