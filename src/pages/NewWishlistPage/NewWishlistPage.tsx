import {List} from '@telegram-apps/telegram-ui';
import {postApiUserWishlist, ServiceCreateWishlistRequest} from '@/backend-client';
import {FC, memo} from 'react';
import {useNavigate} from "react-router";

import {Page} from "@/components/Page.tsx";
import {useBackendFriends} from "@/hooks/useBackendFriends.tsx";
import {EditWishlist} from "@/components/EditWishlist/EditWishlist.tsx";
import {toast} from "react-hot-toast";
import {ToastBackendError} from "@/components/ToastBackendError/ToastBackendError.tsx";

export const NewWishlistPage: FC = memo(function NewWishlistPage() {
  const navigate = useNavigate()

  const {friends, isLoading} = useBackendFriends();

  const handleSaveNewWishlist = async (newWishlist: ServiceCreateWishlistRequest) => {
    const toastId = toast.loading("Creating new wishlist...")

    const {data, error} = await postApiUserWishlist({body: newWishlist});

    if (error) {
      toast.error(
        <ToastBackendError error={error}/>,
        {id: toastId},
      )
      return
    }

    toast.success("Wishlist created successfully", {id: toastId})

    navigate(`/wishlists/${data!.id!}/items`, {replace: true, state: data})
  };

  return <Page pageTitle={"New wishlist"}>
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
