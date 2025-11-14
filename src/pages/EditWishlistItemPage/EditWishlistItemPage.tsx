import {useLocation, useNavigate} from 'react-router-dom';
import {FC} from 'react';
import {List} from "@telegram-apps/telegram-ui";
import {Page} from "@/components/Page.tsx";
import {EditWishlistItem} from "@/components/EditWishlistItem/EditWishlistItem.tsx";
import {
  patchApiUserWishlistItem,
  ServiceCreateWishlistItemRequest, ServiceWishlistItem
} from "@/backend-client";

const loadState = () => {
  let {state} = useLocation()
  return state as ServiceWishlistItem
}

export const EditWishlistItemPage: FC = () => {
  const wishlistItem = loadState()
  console.log(wishlistItem)

  const navigate = useNavigate()

  const handleSaveWishlistItem = async (item: ServiceCreateWishlistItemRequest) => {
    item.wishlist_id = wishlistItem.wishlist_id
    const {data, error} = await patchApiUserWishlistItem({
      body: item,
      query: {
        item_id: wishlistItem.id!,
      }
    })

    if (error !== undefined || data === undefined) {
      throw error
    }

    navigate(`/wishlist/${wishlistItem.wishlist_id}/item/${data.id!}`, {state: data})
  };

  return <Page>
    <List>
      <EditWishlistItem
        onSave={handleSaveWishlistItem} wishlist={wishlistItem}/>
    </List>
  </Page>
};
