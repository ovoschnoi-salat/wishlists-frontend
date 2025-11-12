import {
  List, Section,
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';

import {Wishlists} from "@/components/Wishlists/Wishlists.tsx";
import {Page} from "@/components/Page.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {loadFriendWishlists} from "@/hooks/loadFriendWishlists.ts";
import {ServiceWishlist} from "@/backend-client";

export const FriendWishlistsPage: FC = () => {
  const {friendId} = useParams<{ friendId: string }>();

  if (!friendId) {
    return <div>Wishlist ID not found</div>;
  }

  const friendIdNumber = parseInt(friendId, 10);

  const {wishlists, isLoading} = loadFriendWishlists(friendIdNumber);

  const navigate = useNavigate()
  const handleWishlistPress = (wishlist: ServiceWishlist) => {
    navigate(`/friend/${friendId}/wishlist/${wishlist.id}/items`, {state: wishlist});
  };

  return <Page>
    <List>
      <Section header={"Friend wishlists"}>
        <Wishlists wishlists={wishlists} isLoading={isLoading} onWishlistClick={handleWishlistPress}/>
      </Section>
    </List>
  </Page>
};
