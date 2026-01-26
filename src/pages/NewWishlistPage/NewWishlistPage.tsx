import {List} from '@telegram-apps/telegram-ui';
import {postApiUserWishlist, ServiceCreateWishlistRequest} from '@/backend-client';
import {FC, memo} from 'react';
import {useNavigate} from "react-router";

import {Page} from "@/components/Page.tsx";
import {useBackendFriends} from "@/hooks/useBackendFriends.tsx";
import {EditWishlist} from "@/components/EditWishlist/EditWishlist.tsx";
import {toast} from "react-hot-toast";
import {ToastBackendError} from "@/components/ToastBackendError/ToastBackendError.tsx";
import {Loading} from "@/components/Loading.tsx";
import {useTranslation} from "react-i18next";

export const NewWishlistPage: FC = memo(function NewWishlistPage() {
  const navigate = useNavigate();
  const {t} = useTranslation();

  const {friends, isLoading} = useBackendFriends();

  const handleSaveNewWishlist = async (newWishlist: ServiceCreateWishlistRequest) => {
    const toastId = toast.loading(t('wishlist.toast.creating'))

    const {data, error} = await postApiUserWishlist({body: newWishlist});

    if (error) {
      toast.error(
        <ToastBackendError error={error}/>,
        {id: toastId},
      )
      return
    }

    toast.success(t('wishlist.toast.created'), {id: toastId})

    navigate(`/wishlist`, {replace: true, state: data})
  };

  if (isLoading) {
    return <Loading/>
  }

  return <Page>
    <List>
      <EditWishlist
        onSave={handleSaveNewWishlist}
        friends={friends}
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
