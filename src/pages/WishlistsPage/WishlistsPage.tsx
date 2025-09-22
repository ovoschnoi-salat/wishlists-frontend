import {useEffect, useState} from 'react';
import {
  Section,
  Cell,
  List,
  Button,
  Navigation,
  Modal,
} from '@telegram-apps/telegram-ui';
import {useNavigate} from 'react-router-dom';
import type {FC} from 'react';

import {NewWishlist} from '@/components/NewWishlist/NewWishlist.tsx';
import {getUserWishlists, postUserWishlists, ServiceWishlist} from '@/backend-client';

import './WishlistsPage.css';

interface Wishlist {
  id: number;
  title: string;
  description: string;
  isPrivate: boolean;
}


export const WishlistsPage: FC = () => {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [isNewWishlistModalOpen, setIsNewWishlistModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        let {data, error} = await getUserWishlists({});
        if (error) {
          console.error('Failed to load wishlists', error);
          setError(typeof error === 'string' ? error : (error as any)?.message ?? 'Failed to load wishlists');
          return;
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
        setError((e as Error)?.message ?? 'Failed to load wishlists');
      }
    })();
  }, []);

  if (error) {
    throw new Error(error);
  }

  const handleWishlistPress = (wishlist: Wishlist) => {
    console.log('Navigate to wishlist:', wishlist.id);
    navigate(`/wishlists/${wishlist.id}`);
  };

  const handleSaveNewWishlist = async (newWishlist: {
    title: string;
    description: string;
    isPrivate: boolean;
    usersWithAccess: number;
  }) => {
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
  };

  return (
    <List>
      <Section
        header='My Lists'
      >
        {wishlists
          // .filter(wishlist =>
          //   activeTab === 'my-lists' ? !wishlist.isPrivate : wishlist.isPrivate
          // )
          .map((wishlist) => (
            <Cell
              key={wishlist.id}
              after={<Navigation/>}
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
