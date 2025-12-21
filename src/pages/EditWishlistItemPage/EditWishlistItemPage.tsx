import {useLocation, useNavigate} from 'react-router';
import {FC, memo, useCallback, useState} from 'react';
import {List} from "@telegram-apps/telegram-ui";
import {Page} from "@/components/Page.tsx";
import {EditWishlistItem} from "@/components/EditWishlistItem/EditWishlistItem.tsx";
import {
  deleteApiUserWish,
  patchApiUserWishlistItem,
  ServiceCreateWishlistItemRequest, ServiceWishlistItem, SubcodeErrorsResponse
} from "@/backend-client";
import {BackendErrorHandler} from "@/components/BackendErrorHandler/BackendErrorHandler.tsx";

const useLocationState = () => {
  const {state} = useLocation()
  return state as ServiceWishlistItem
}

export const EditWishlistItemPage: FC = memo(function EditWishlistItemPage() {
  const navigate = useNavigate()
  const [updateWishError, setUpdateWishError] = useState<SubcodeErrorsResponse | undefined>()
  const [deleteWishError, setDeleteWishError] = useState<SubcodeErrorsResponse | undefined>()

  const item = useLocationState()

  const handleSaveWish = useCallback(async (newItem: ServiceCreateWishlistItemRequest) => {
    newItem.wishlist_id = item.wishlist_id

    const {data, error} = await patchApiUserWishlistItem({
      body: newItem,
      query: {
        item_id: item.id!,
      }
    })

    if (error) {
      setUpdateWishError(error)
      return
    }

    navigate(`..`, {replace: true, relative: "path", state: data})
  }, [item, navigate]);

  const handleDeleteWish = useCallback(async () => {
    const {error} = await deleteApiUserWish({
      query: {
        wish_id: item.id!,
      }
    })

    if (error) {
      setDeleteWishError(error)
      return
    }

    navigate(-1)
  }, [item.id, navigate])

  return <Page
    pageTitle={"Wishlist item edit"}
    backNavFn={() => {
      navigate(`..`, {replace: true, relative: "path", state: item})
    }}>
    <BackendErrorHandler error={deleteWishError} resetError={setDeleteWishError}/>
    <BackendErrorHandler error={updateWishError} resetError={setUpdateWishError}/>
    <List>
      <EditWishlistItem
        onSave={handleSaveWish} onDelete={handleDeleteWish} wishlist={item}/>
    </List>
  </Page>
});
