import {useNavigate, useParams} from 'react-router';
import {FC, memo} from 'react';
import {List} from "@telegram-apps/telegram-ui";
import {Page} from "@/components/Page.tsx";
import {EditWishlistItem} from "@/components/EditWishlistItem/EditWishlistItem.tsx";
import {
  postApiUserWishlistItem,
  ServiceCreateWishlistItemRequest
} from "@/backend-client";
import {toast} from "react-hot-toast";
import {ToastBackendError} from "@/components/ToastBackendError/ToastBackendError.tsx";

export const NewWishPage: FC = memo(function NewWishlistItemPage() {
  const navigate = useNavigate()

  const {wishlistId} = useParams<{ wishlistId: string }>();

  if (!wishlistId) {
    return <div>Wishlist ID not found</div>;
  }

  const wishlistIdNumber = parseInt(wishlistId, 10);

  if (isNaN(wishlistIdNumber)) {
    return <div>Invalid wishlist ID</div>;
  }

  const handleSaveNewWishlistItem = async (item: ServiceCreateWishlistItemRequest) => {
    const toastId = toast.loading("Creating new wish...")

    item.wishlist_id = wishlistIdNumber
    const {data, error} = await postApiUserWishlistItem({
      body: item,
    })

    if (error) {
      toast.error(<ToastBackendError error={error}/>, {id: toastId})
      return
    }

    toast.success("Wish created successfully", {id: toastId})

    navigate(`/wishlists/${wishlistId}/items/${data.id!}`, {replace: true, state: data})
  };

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
