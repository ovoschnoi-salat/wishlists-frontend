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
import {Loading} from "@/components/Loading.tsx";
import {useTranslation} from "react-i18next";

const useLocationState = () => {
  const {state} = useLocation()
  return state as ServiceWishlist | undefined
}

export const EditWishlistPage: FC = memo(function EditWishlistPage() {
  const navigate = useNavigate();
  const {t} = useTranslation();

  const wishlist = useLocationState()

  if (!wishlist) {
    throw t('invalidState')
  }

  const {friends, isLoading} = useBackendFriends();

  const {accessList, isLoading: isLoadingAccessList} = useBackendWishlistAccessList(wishlist.id!)

  const handleDeleteWishlist = async () => {
    const toastId = toast.loading(t('wishlist.toast.removing'))

    const {error} = await deleteApiUserWishlist({
      query: {wishlist_id: wishlist.id!}
    });

    if (error) {
      toast.error(<ToastBackendError error={error}/>, {id: toastId})
      return
    }

    toast.success(t('wishlist.toast.removed'), {id: toastId})

    navigate(-1)
  };

  const handleSaveWishlist = async (newWishlist: ServiceCreateWishlistRequest) => {
    const toastId = toast.loading(t('wishlist.toast.editing'))

    const {data, error} = await patchApiUserWishlist({
      body: newWishlist,
      query: {wishlist_id: wishlist.id!}
    });

    if (error) {
      toast.error(<ToastBackendError error={error}/>, {id: toastId})
      return
    }

    toast.success(t('wishlist.toast.edited'), {id: toastId})

    navigate(`..`, {replace: true, relative: "path", state: data})
  };

  if (isLoading || isLoadingAccessList) {
    return <Loading/>
  }

  return <Page
    backNavFn={() => {
      console.log("go back to wishlist")
      navigate(`..`, {replace: true, relative: "path", state: wishlist})
    }}>
    <List>
      <EditWishlist
        wishlist={wishlist}
        friendsWithAccess={accessList}
        friends={friends}
        onSave={handleSaveWishlist}
        onDelete={handleDeleteWishlist}
      />
    </List>
  </Page>
});
