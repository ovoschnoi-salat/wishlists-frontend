import {WishlistItems} from '@/components/WishlistItems';
import {useNavigate, useParams} from 'react-router-dom';
import {FC, useState} from 'react';
import {Button, List, Modal, Section} from "@telegram-apps/telegram-ui";
import {Page} from "@/components/Page.tsx";
import {NewWishlistItem} from "@/components/NewWishlistItem/NewWishlistItem.tsx";
import {loadWishlistItems} from "@/hooks/loadWishlistItems.ts";
import {Icon28Plus} from "@/icons/28/Plus.tsx";

export const FriendWishlistItemsPage: FC = () => {
  const [isNewWishlistItemModalOpen, setIsNewWishlistItemModalOpen] = useState(false);
  // const navigate = useNavigate();
  const {friendId, wishlistId} = useParams<{friendId: string, wishlistId: string }>();

  if (!friendId) {
    return <div>Friend ID not found</div>;
  }
  if (!wishlistId) {
    return <div>Wishlist ID not found</div>;
  }

  const friendIdNumber = parseInt(friendId, 10);

  const wishlistIdNumber = parseInt(wishlistId, 10);

  if (isNaN(wishlistIdNumber)) {
    return <div>Invalid wishlist ID</div>;
  }

  const navigate = useNavigate()
  const handleItemPress = (itemId: number) => {
    navigate(`/friend/${friendIdNumber}/wishlist/item/${itemId}`)
  };

  const {items, isLoading} = loadWishlistItems(wishlistIdNumber);

  const handleSaveNewWishlistItem = () => {
    console.log('Navigate to add item page');
    // TODO: Navigate to add item page
    // Example: navigate(`/wishlist/${wishlistId}/add-item`);
  };

  return (
    <Page>
      <List>
        <WishlistItems items={items} isLoading={isLoading} onItemClick={handleItemPress}/>

        <Section>
          <Modal
            key="new-wishlist-item-modal"
            open={isNewWishlistItemModalOpen}
            onOpenChange={setIsNewWishlistItemModalOpen}
            header={<Modal.Header>New item</Modal.Header>}
            trigger={<Button
              mode="filled"
              size="m"
              stretched
              before={<Icon28Plus/>}
            >
              Add item
            </Button>}
          >
            <NewWishlistItem
              onSave={handleSaveNewWishlistItem}
            />
          </Modal>
        </Section>
      </List>
    </Page>
  );
};
