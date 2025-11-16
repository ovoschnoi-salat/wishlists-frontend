import {
  List, Section,
} from '@telegram-apps/telegram-ui';
import {FC} from 'react';

import {Wishlists} from "@/components/Wishlists/Wishlists.tsx";
import {Page} from "@/components/Page.tsx";
import {useNavigate, useParams} from "react-router";
import {loadFriendWishlists} from "@/hooks/loadFriendWishlists.ts";
import {ServiceWishlist} from "@/backend-client";
import {BackendErrorHandler} from "@/components/BackendErrorHandler/BackendErrorHandler.tsx";

export const FriendWishlistsPage: FC = () => {
  const navigate = useNavigate()

  // TODO load state

  const {friendId} = useParams<{ friendId: string }>();

  if (!friendId) {
    return <div>Wishlist ID not found</div>;
  }

  const friendIdNumber = parseInt(friendId, 10);

  const {wishlists, isLoading, error, resetError} = loadFriendWishlists(friendIdNumber);

  const handleWishlistPress = (wishlist: ServiceWishlist) => {
    navigate(`../wishlist/${wishlist.id}/items`, {state: wishlist, relative: "path"});
  };

  return <Page>
    <BackendErrorHandler error={error} resetError={resetError}/>
    <List>
      <Section header={"Friend wishlists"}>
        <Wishlists wishlists={wishlists} isLoading={isLoading} onWishlistClick={handleWishlistPress}/>
      </Section>
    </List>
  </Page>
};
