import {useLocation, useNavigate} from 'react-router';
import {FC, memo, useCallback} from 'react';
import {List} from "@telegram-apps/telegram-ui";
import {Page} from "@/components/Page.tsx";
import {EditWishlistItem} from "@/components/EditWishlistItem/EditWishlistItem.tsx";
import {
  deleteApiUserWish,
  patchApiUserWishlistItem,
  ServiceCreateWishlistItemRequest, ServiceWishlistItem
} from "@/backend-client";
import {toast} from "react-hot-toast";
import {ToastBackendError} from "@/components/ToastBackendError/ToastBackendError.tsx";

const useLocationState = () => {
  const {state} = useLocation()
  return state as ServiceWishlistItem | undefined
}

export const EditWishPage: FC = memo(function EditWishlistItemPage() {
  const navigate = useNavigate()

  const item = useLocationState()

  if (!item) {
    throw "invalid state"
  }

  const handleSaveWish = useCallback(async (newItem: ServiceCreateWishlistItemRequest) => {
    const toastId = toast.loading("Saving wish...")

    newItem.wishlist_id = item.wishlist_id

    const {data, error} = await patchApiUserWishlistItem({
      body: newItem,
      query: {
        item_id: item.id!,
      }
    })

    if (error) {
      toast.error(<ToastBackendError error={error}/>, {id: toastId})
      return
    }

    toast.success("Wish saved successfully", {id: toastId})

    navigate(`..`, {replace: true, relative: "path", state: data})
  }, [item, navigate]);

  const handleDeleteWish = useCallback(async () => {
    const toastId = toast.loading("Deleting wish...")

    const {error} = await deleteApiUserWish({
      query: {
        wish_id: item.id!,
      }
    })

    if (error) {
      toast.error(<ToastBackendError error={error}/>, {id: toastId})
      return
    }

    toast.success("Wish deleted successfully", {id: toastId})

    navigate(-1)
  }, [item.id, navigate])

  return <Page
    pageTitle="Edit wish"
    backNavFn={() => {
      navigate(`..`, {replace: true, relative: "path", state: item})
    }}>
    <List>
      <EditWishlistItem
        onSave={handleSaveWish} onDelete={handleDeleteWish} wishlist={item}/>
    </List>
  </Page>
});
