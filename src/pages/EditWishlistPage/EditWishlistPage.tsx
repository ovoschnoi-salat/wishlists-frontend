import {List} from '@telegram-apps/telegram-ui';
import {FC, memo} from 'react';

import {
  deleteApiUserWishlist,
  patchApiUserWishlist,
  ServiceCreateWishlistRequest,
  ServiceWishlist,
} from '@/backend-client';
import {Page} from "@/components/Page.tsx";
import {useLocation, useNavigate} from "react-router";
import {useBackendFriends} from "@/hooks/useBackendFriends.tsx";
import {useBackendWishlistAccessList} from "@/hooks/useBackendWishlistAccessList.tsx";
import {EditWishlist} from "@/components/EditWishlist/EditWishlist.tsx";
import {toast} from "react-hot-toast";
import {ToastBackendError} from "@/components/ToastBackendError/ToastBackendError.tsx";

const useLocationState = () => {
  const {state} = useLocation()
  return state as ServiceWishlist
}

export const EditWishlistPage: FC = memo(function EditWishlistPage() {
  const navigate = useNavigate()

  const wishlist = useLocationState()

  const {friends, isLoading} = useBackendFriends();

  const WishlistAccessList = useBackendWishlistAccessList(wishlist.id!)


  const handleDeleteWishlist = async () => {
    const toastId = toast.loading("Deleting wishlist...")

    const {error} = await deleteApiUserWishlist({
      query: {wishlist_id: wishlist.id!}
    });

    if (error) {
      toast.error(<ToastBackendError error={error}/>, {id: toastId})
      return
    }

    toast.success("Wishlist deleted successfully", {id: toastId})

    navigate(-1)
  };

  const handleSaveWishlist = async (newWishlist: ServiceCreateWishlistRequest) => {
    const toastId = toast.loading("Saving wishlist...")

    const {data, error} = await patchApiUserWishlist({
      body: newWishlist,
      query: {wishlist_id: wishlist.id!}
    });

    if (error) {
      toast.error(<ToastBackendError error={error}/>, {id: toastId})
      return
    }

    toast.success("Wishlist saved successfully", {id: toastId})

    navigate(`../items`, {replace: true, relative: "path", state: data})
  };

  return <Page
    pageTitle={"Wishlist edit"}
    backNavFn={() => {
      navigate(`../items`, {replace: true, relative: "path", state: wishlist})
    }}>
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
