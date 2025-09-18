import {useEffect, useState} from 'react';
import {
  Section,
  Cell,
  List,
  Button,
  Text,
  Navigation,
  Modal,
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';

import {NewWishlist} from '@/components/NewWishlist/NewWishlist.tsx';
import './WishlistsPage.css';
import {
  SectionHeader
} from "@telegram-apps/telegram-ui/dist/components/Blocks/Section/components/SectionHeader/SectionHeader";
import {getUserWishlists, postUserWishlists, ServiceWishlist} from '@/backend-client';

interface Wishlist {
  id: number;
  title: string;
  description: string;
  // itemCount: number;
  isPrivate: boolean;
}

const mockWishlists: Wishlist[] = [
  {
    id: 1,
    title: 'Birthday Wishlist',
    description: 'Things I want for my birthday',
    isPrivate: true,
  },
  {
    id: 2,
    title: 'Christmas Gifts',
    description: 'Holiday gift ideas',
    isPrivate: false,
  },
  {
    id: 3,
    title: 'Home Decor',
    description: 'New apartment essentials',
    isPrivate: true,
  },
  {
    id: 4,
    title: 'Tech Gadgets',
    description: 'Latest tech I want to buy',
    isPrivate: false,
  }
];

export const WishlistsPage: FC = () => {
  const [wishlists, setWishlists] = useState<Wishlist[]>(mockWishlists);
  const [isNewWishlistModalOpen, setIsNewWishlistModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        let {data, error} = await getUserWishlists({});
        if (error) {
          console.error('Failed to load wishlists', error);
          setWishlists(mockWishlists)
          return
        }
        data = data ? data : []
        const mapped: Wishlist[] = data.map((w: ServiceWishlist) => ({
          id: w.id ?? 0,
          title: w.title ?? '',
          description: w.description ?? '',
          isPrivate: w.is_private ?? false,
        } as Wishlist));
        setWishlists(mapped);
      } catch (e) {
        console.error('Failed to load wishlists', e);
      }
    })();
  }, []);

  const handleWishlistPress = (wishlist: Wishlist) => {
    console.log('Navigate to wishlist:', wishlist.id);
    // TODO: Navigate to wishlist detail page
  };

  const handleSaveNewWishlist = async (newWishlist: {
    title: string;
    description: string;
    isPrivate: boolean;
    usersWithAccess: number;
  }) => {
    try {
      const {data, error} = await postUserWishlists({
        body: {
          title: newWishlist.title,
          description: newWishlist.description,
          is_private: newWishlist.isPrivate,
        }
      });

      if (error) {
        console.error('Failed to create wishlist', error);
        return;
      }

      if (data) {
        const wishlist: Wishlist = {
          id: data.id ?? 0,
          title: data.title ?? '',
          description: data.description ?? '',
          isPrivate: data.is_private ?? false,
        };

        setWishlists(prev => [...prev, wishlist]);
        setIsNewWishlistModalOpen(false);
      }
    } catch (e) {
      console.error('Failed to create wishlist', e);
    }
  };

  return (
    <List>
      <Section
        header={
          <SectionHeader>
            <Text weight="2">
              {'My Lists'}
            </Text>
          </SectionHeader>
        }
      >
        {wishlists
          // .filter(wishlist =>
          //   activeTab === 'my-lists' ? !wishlist.isPrivate : wishlist.isPrivate
          // )
          .map((wishlist) => (
            <Cell
              key={wishlist.id}
              after={<Navigation></Navigation>}
              subtitle={wishlist.isPrivate ? `Private` : undefined}
              onClick={() => handleWishlistPress(wishlist)}
            >
              {wishlist.title}
            </Cell>
          ))}
      </Section>

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
  );
};
