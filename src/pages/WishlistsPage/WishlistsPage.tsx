import {useState} from 'react';
import {
  Section,
  List,
  Button,
  Modal,
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';

import {NewWishlist} from '@/components/NewWishlist/NewWishlist.tsx';
import {postUserWishlists} from '@/backend-client';
import {loadWishlists} from "@/hooks/loadWishlists.ts";
import {Wishlists} from "@/components/Wishlists/Wishlists.tsx";
import {Page} from "@/components/Page.tsx";
import {Loading} from "@/components/Loading.tsx";
import {Icon28Plus} from "@/icons/28/Plus.tsx";

export const WishlistsPage: FC = () => {
  const {wishlists, isLoading, refetch} = loadWishlists();
  const [isNewWishlistModalOpen, setIsNewWishlistModalOpen] = useState(false);

  const handleSaveNewWishlist = async (newWishlist: {
    title: string;
    description: string;
    isPrivate: boolean;
    usersWithAccess: number;
  }) => {
    const {error} = await postUserWishlists({
      body: {
        title: newWishlist.title,
        description: newWishlist.description,
        is_private: newWishlist.isPrivate,
      }
    });

    if (error) {
      throw error
    }

    await refetch()
    setIsNewWishlistModalOpen(false);
  };

  if (isLoading) {
    return <Loading/>;
  }

  return (<Page>
      <List>
        <Wishlists wishlists={wishlists} isLoading={isLoading}/>

        {/* Add List Button */}
        <Section>
          <Modal
            open={isNewWishlistModalOpen}
            onOpenChange={setIsNewWishlistModalOpen}
            header={<Modal.Header>New Wishlist</Modal.Header>}
            trigger={<Button
              mode="filled"
              size="m"
              stretched
              before={<Icon28Plus/>}
            >
              Add wishlist
            </Button>}
          >
            <NewWishlist
              onSave={handleSaveNewWishlist}
            />
          </Modal>
        </Section>
      </List>
    </Page>
  );
};
