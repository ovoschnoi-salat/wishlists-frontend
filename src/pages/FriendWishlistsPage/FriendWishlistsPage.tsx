import {
  List, Section,
} from '@telegram-apps/telegram-ui';
import {FC, memo, useCallback} from 'react';

import {Page} from "@/components/Page.tsx";
import {useNavigate, useParams} from "react-router";
import {useBackendFriendWishlists} from "@/hooks/useBackendFriendWishlists.tsx";
import {ServiceWishlist} from "@/backend-client";
import {FriendWishlists} from "@/components/FriendWishlists/FriendWishlists.tsx";

export const FriendWishlistsPage: FC = memo(function FriendWishlistsPage() {
  const navigate = useNavigate()

  // TODO load state

  const handleWishlistPress = useCallback((wishlist: ServiceWishlist) => {
    navigate(`../wishlists/${wishlist.id}/items`, {state: wishlist, relative: "path"});
  }, [navigate]);

  const {friendId} = useParams<{ friendId: string }>();

  const friendIdNumber = parseInt(friendId ?? "0", 10);

  const {wishlists, isLoading} = useBackendFriendWishlists(friendIdNumber);

  if (!friendId) {
    return <div>Wrong friend ID</div>;
  }

  return <Page>
    <List>
      <Section header={"Friend wishlists"}>
        <FriendWishlists wishlists={wishlists} isLoading={isLoading} onWishlistClick={handleWishlistPress}/>
      </Section>
    </List>
  </Page>
});
