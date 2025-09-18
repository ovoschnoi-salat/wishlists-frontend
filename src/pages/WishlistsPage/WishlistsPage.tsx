import {useEffect, useState} from 'react';
import {
  Section,
  Cell,
  List,
  Tabbar,
  Button,
  Text,
  Navigation,
  Modal,
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';

import {Page} from '@/components/Page.tsx';
import {NewWishlist} from '@/components/NewWishlist/NewWishlist.tsx';
import './WishlistsPage.css';
import {
  SectionHeader
} from "@telegram-apps/telegram-ui/dist/components/Blocks/Section/components/SectionHeader/SectionHeader";
import {Icon28Person} from "@/icons/28/Person.tsx";
import {Icon28Group} from "@/icons/28/Group.tsx";
import {Icon28Actions} from "@/icons/28/Actions.tsx";
import {getUserWishlists} from '@/backend-client';

interface Wishlist {
  id: string;
  title: string;
  description: string;
  // itemCount: number;
  isPrivate: boolean;
}

const mockWishlists: Wishlist[] = [
  {
    id: '1',
    title: 'Birthday Wishlist',
    description: 'Things I want for my birthday',
    isPrivate: true,
  },
  {
    id: '2',
    title: 'Christmas Gifts',
    description: 'Holiday gift ideas',
    isPrivate: false,
  },
  {
    id: '3',
    title: 'Home Decor',
    description: 'New apartment essentials',
    isPrivate: true,
  },
  {
    id: '4',
    title: 'Tech Gadgets',
    description: 'Latest tech I want to buy',
    isPrivate: false,
  }
];

export const WishlistsPage: FC = () => {
  const [activeTab, setActiveTab] = useState('my-lists');
  const [wishlists, setWishlists] = useState<Wishlist[]>(mockWishlists);
  const [isNewWishlistModalOpen, setIsNewWishlistModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        let {data, error} = await getUserWishlists({});
        if (error) {
          console.error('Failed to load wishlists', error);
          return
        }
        data = data? data : []
        const mapped: Wishlist[] = data.map((w: any) => ({
          id: w.id ?? '',
          title: w.title ?? '',
          description: w.description ?? '',
          isPrivate: w.isPrivate ?? false,
        }));
        setWishlists(mapped);
      } catch (e) {
        console.error('Failed to load wishlists', e);
      }
    })();
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleWishlistPress = (wishlist: Wishlist) => {
    console.log('Navigate to wishlist:', wishlist.id);
    // TODO: Navigate to wishlist detail page
  };

  const handleAddWishlist = () => {
    // setShowNewWishlist(true);
  };

  const handleSaveNewWishlist = (newWishlist: {
    title: string;
    description: string;
    isPrivate: boolean;
    usersWithAccess: number;
  }) => {
    const wishlist: Wishlist = {
      id: Date.now().toString(),
      title: newWishlist.title,
      description: newWishlist.description,
      isPrivate: newWishlist.isPrivate,
    };

    setWishlists(prev => [wishlist, ...prev]);

    setIsNewWishlistModalOpen(false);
  };

  return (
    <Page back={true}>

      {/* Main Content */}
      <List>
        <Section
          header={
            <SectionHeader>
              <Text weight="2">
                {activeTab === 'my-lists' ? 'My Lists' : 'Shared Lists'}
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
              onClick={handleAddWishlist}
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

      {/* Tab Bar */}
      <Tabbar>
        <Tabbar.Item
          key="my-lists"
          text="My Lists"
          selected={activeTab === 'my-lists'}
          onClick={() => handleTabChange('my-lists')}
        >
          <Icon28Actions></Icon28Actions>
        </Tabbar.Item>

        <Tabbar.Item
          key="friends"
          text="Friends"
          selected={activeTab === 'friends'}
          onClick={() => handleTabChange('friends')}
        >
          <Icon28Group></Icon28Group>
        </Tabbar.Item>
        <Tabbar.Item
          key="profile"
          text="Profile"
          selected={activeTab === 'profile'}
          onClick={() => handleTabChange('profile')}
        >
          <Icon28Person></Icon28Person>
        </Tabbar.Item>
      </Tabbar>
    </Page>
  );
};
