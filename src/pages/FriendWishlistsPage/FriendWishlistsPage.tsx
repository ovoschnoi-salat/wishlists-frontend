import {
  List, Section,
} from '@telegram-apps/telegram-ui';
import {FC, memo, useCallback} from 'react';

import {Page} from "@/components/Page.tsx";
import {useNavigate, useParams} from "react-router";
import {useBackendFriendWishlists} from "@/hooks/useBackendFriendWishlists.ts";
import {ServiceWishlist} from "@/backend-client";
import {BackendErrorHandler} from "@/components/BackendErrorHandler/BackendErrorHandler.tsx";
import {FriendWishlists} from "@/components/FriendWishlists/FriendWishlists.tsx";

export const FriendWishlistsPage: FC = memo(function FriendWishlistsPage() {
  const navigate = useNavigate()

  // TODO load state

  const handleWishlistPress = useCallback((wishlist: ServiceWishlist) => {
    navigate(`../wishlists/${wishlist.id}/items`, {state: wishlist, relative: "path"});
  }, [navigate]);

  const {friendId} = useParams<{ friendId: string }>();

  const friendIdNumber = parseInt(friendId ?? "0", 10);

  const {wishlists, isLoading, error, resetError} = useBackendFriendWishlists(friendIdNumber);

  if (!friendId) {
    return <div>Wrong friend ID</div>;
  }

  return <Page>
    <BackendErrorHandler error={error} resetError={resetError}/>
    <List>
      <Section header={"Friend wishlists"}>
        <FriendWishlists wishlists={wishlists} isLoading={isLoading} onWishlistClick={handleWishlistPress}/>
      </Section>
    </List>
  </Page>
});
