import {useLocation, useNavigate} from 'react-router';
import {FC, memo, useCallback} from 'react';
import {List} from "@telegram-apps/telegram-ui";
import {Page} from "@/components/Page.tsx";
import {EditWishlistItem} from "@/components/EditWishlistItem/EditWishlistItem.tsx";
import {
  postApiUserWishlistItem,
  ServiceCreateWishlistItemRequest,
  ServiceWishlist
} from "@/backend-client";
import {toast} from "react-hot-toast";
import {ToastBackendError} from "@/components/ToastBackendError/ToastBackendError.tsx";

export const NewWishPage: FC = memo(function NewWishlistItemPage() {
  const navigate = useNavigate()

  const {state} = useLocation()
  const wishlist = state as ServiceWishlist | undefined

  if (!wishlist) {
    throw "invalid state"
  }

  const handleSaveNewWishlistItem = useCallback(async (item: ServiceCreateWishlistItemRequest) => {
    const toastId = toast.loading("Creating new wish...")

    item.wishlist_id = wishlist.id
    const {data, error} = await postApiUserWishlistItem({
      body: item,
    })

    if (error) {
      toast.error(<ToastBackendError error={error}/>, {id: toastId})
      return
    }

    toast.success("Wish created successfully", {id: toastId})

    navigate(`/wishlist/item`, {replace: true, state: data})
  }, [navigate, wishlist]);

  return <Page pageTitle={"New wish"}>
    <List>
      <EditWishlistItem
        onSave={handleSaveNewWishlistItem}
        wishlist={{
          description: "",
          id: undefined,
          links: [],
          price: "",
          reservable: true,
          title: "",
          wishlist_id: undefined
        }}/>
    </List>
  </Page>
});
