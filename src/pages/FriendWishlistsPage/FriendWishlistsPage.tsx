import {
  List,
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';

import {Wishlists} from "@/components/Wishlists/Wishlists.tsx";
import {Page} from "@/components/Page.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {loadFriendWishlists} from "@/hooks/loadFriendWishlists.ts";

export const FriendWishlistsPage: FC = () => {
  const {friendId} = useParams<{ friendId: string }>();

  if (!friendId) {
    return <div>Wishlist ID not found</div>;
  }

  const friendIdNumber = parseInt(friendId, 10);

  const {wishlists, isLoading} = loadFriendWishlists(friendIdNumber);

  const navigate = useNavigate()
  const handleWishlistPress = (wishlistId: number) => {
      navigate(`friend/${friendId}/wishlist/${wishlistId}`);
  };

  return (
    <Page>
      <List>
        <Wishlists wishlists={wishlists} isLoading={isLoading} onWishlistClick={handleWishlistPress}/>
      </List>
    </Page>
  );
};
