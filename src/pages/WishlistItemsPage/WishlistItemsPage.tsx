import {WishlistItems} from '@/components/WishlistItems';
import {useParams} from 'react-router-dom';
import {FC, useState} from 'react';
import {Button, List, Modal, Section} from "@telegram-apps/telegram-ui";
import {Page} from "@/components/Page.tsx";
import {NewWishlistItem} from "@/components/NewWishlistItem/NewWishlistItem.tsx";
import {loadWishlistItems} from "@/hooks/loadWishlistItems.ts";

export const WishlistItemsPage: FC = () => {
  const [isNewWishlistModalOpen, setIsNewWishlistModalOpen] = useState(false);
  // const navigate = useNavigate();
  const {wishlistId} = useParams<{ wishlistId: string }>();

  if (!wishlistId) {
    return <div>Wishlist ID not found</div>;
  }

  const wishlistIdNumber = parseInt(wishlistId, 10);

  if (isNaN(wishlistIdNumber)) {
    return <div>Invalid wishlist ID</div>;
  }

  const {items, isLoading} = loadWishlistItems(wishlistIdNumber);

  const handleSaveNewWishlistItem = () => {
    console.log('Navigate to add item page');
    // TODO: Navigate to add item page
    // Example: navigate(`/wishlist/${wishlistId}/add-item`);
  };

  return (
    <Page>
      <List>
      <WishlistItems
        items={items}
        isLoading={isLoading}
      />
      <Section>
        <Modal
          open={isNewWishlistModalOpen}
          onOpenChange={setIsNewWishlistModalOpen}
          header={<Modal.Header>New item</Modal.Header>}
          trigger={<Button
            mode="filled"
            size="m"
            stretched
          >
            Add wishlist
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
