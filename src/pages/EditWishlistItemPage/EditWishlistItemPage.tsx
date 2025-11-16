import {useLocation, useNavigate} from 'react-router';
import {FC, useState} from 'react';
import {List} from "@telegram-apps/telegram-ui";
import {Page} from "@/components/Page.tsx";
import {EditWishlistItem} from "@/components/EditWishlistItem/EditWishlistItem.tsx";
import {
  patchApiUserWishlistItem,
  ServiceCreateWishlistItemRequest, ServiceWishlistItem, SubcodeErrorsResponse
} from "@/backend-client";
import {BackendErrorHandler} from "@/components/BackendErrorHandler/BackendErrorHandler.tsx";

const loadState = () => {
  let {state} = useLocation()
  return state as ServiceWishlistItem
}

export const EditWishlistItemPage: FC = () => {
  const [updateWishlistItemError, setUpdateWishlistItemError] = useState<SubcodeErrorsResponse | undefined>()

  const item = loadState()

  const navigate = useNavigate()

  const handleSaveWishlistItem = async (newItem: ServiceCreateWishlistItemRequest) => {
    newItem.wishlist_id = item.wishlist_id

    const {data, error} = await patchApiUserWishlistItem({
      body: newItem,
      query: {
        item_id: item.id!,
      }
    })

    if (error) {
      setUpdateWishlistItemError(error)
      return
    }

    navigate(`/wishlist/${item.wishlist_id}/item/${item.id!}`, {replace: true, state: data})
  };

  return <Page
    pageTitle={"Wishlist item edit"}
    backNavFn={() => {
      navigate(`/wishlist/${item.wishlist_id!}/item/${item.id!}`, {replace: true, state: item})
    }}>
    <BackendErrorHandler error={updateWishlistItemError} resetError={setUpdateWishlistItemError}/>
    <List>
      <EditWishlistItem
        onSave={handleSaveWishlistItem} wishlist={item}/>
    </List>
  </Page>
};
