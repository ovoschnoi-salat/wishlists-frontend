import {useNavigate, useParams} from 'react-router';
import {FC, memo, useState} from 'react';
import {List} from "@telegram-apps/telegram-ui";
import {Page} from "@/components/Page.tsx";
import {EditWishlistItem} from "@/components/EditWishlistItem/EditWishlistItem.tsx";
import {
  postApiUserWishlistItem,
  ServiceCreateWishlistItemRequest, SubcodeErrorsResponse
} from "@/backend-client";
import {BackendErrorHandler} from "@/components/BackendErrorHandler/BackendErrorHandler.tsx";

export const NewWishlistItemPage: FC = memo(function NewWishlistItemPage() {
  const navigate = useNavigate()
  const [createWishlistItemError, setCreateWishlistItemError] = useState<SubcodeErrorsResponse | undefined>()

  const {wishlistId} = useParams<{ wishlistId: string }>();

  if (!wishlistId) {
    return <div>Wishlist ID not found</div>;
  }

  const wishlistIdNumber = parseInt(wishlistId, 10);

  if (isNaN(wishlistIdNumber)) {
    return <div>Invalid wishlist ID</div>;
  }

  const handleSaveNewWishlistItem = async (item: ServiceCreateWishlistItemRequest) => {
    item.wishlist_id = wishlistIdNumber
    const {data, error} = await postApiUserWishlistItem({
      body: item,
    })

    if (error) {
      setCreateWishlistItemError(error)
      return
    }

    navigate(`/wishlist/${wishlistId}/item/${data!.id!}`, {replace: true, state: data})
  };

  return <Page pageTitle={"New wishlist item"}>
    <BackendErrorHandler error={createWishlistItemError} resetError={setCreateWishlistItemError}/>
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
