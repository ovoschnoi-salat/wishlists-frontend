import {useNavigate, useParams} from 'react-router';
import {FC} from 'react';
import {List} from "@telegram-apps/telegram-ui";
import {Page} from "@/components/Page.tsx";
import {EditWishlistItem} from "@/components/EditWishlistItem/EditWishlistItem.tsx";
import {
  postApiUserWishlistItem,
  ServiceCreateWishlistItemRequest
} from "@/backend-client";

export const NewWishlistItemPage: FC = () => {
  const {wishlistId} = useParams<{ wishlistId: string }>();

  if (!wishlistId) {
    return <div>Wishlist ID not found</div>;
  }

  const wishlistIdNumber = parseInt(wishlistId, 10);

  if (isNaN(wishlistIdNumber)) {
    return <div>Invalid wishlist ID</div>;
  }

  const navigate = useNavigate()

  const handleSaveNewWishlistItem = async (item: ServiceCreateWishlistItemRequest) => {
    item.wishlist_id = wishlistIdNumber
    const {data, error} = await postApiUserWishlistItem({
      body: item,
    })

    if (error !== undefined || data === undefined) {
      throw error
    }

    navigate(`/wishlist/${wishlistId}/item/${data.id!}`, {state: data})
  };

  return <Page>
    <List>
      <EditWishlistItem
        onSave={handleSaveNewWishlistItem} wishlist={{
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
};
