import {useNavigate, useParams} from 'react-router-dom';
import {FC} from 'react';
import {List} from "@telegram-apps/telegram-ui";
import {Page} from "@/components/Page.tsx";
import {NewWishlistItem} from "@/components/NewWishlistItem/NewWishlistItem.tsx";
import {
  postUserWishlistItem,
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

  const  handleSaveNewWishlistItem = async (item: ServiceCreateWishlistItemRequest) => {
    const {data, error} = await postUserWishlistItem({
      body: item,
      query: {wishlist_id: wishlistIdNumber},
    })

    if (error !== undefined || data === undefined) {
      throw error
    }

    navigate(`/wishlist/${wishlistId}/item/${data.id!}`)
  };

  return (
    <Page>
      <List>
        <NewWishlistItem
          onSave={handleSaveNewWishlistItem}
        />
      </List>
    </Page>
  );
};
