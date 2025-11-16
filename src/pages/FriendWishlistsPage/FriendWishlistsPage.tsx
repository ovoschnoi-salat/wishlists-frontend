import {
  List, Section,
} from '@telegram-apps/telegram-ui';
import {FC} from 'react';

import {Wishlists} from "@/components/Wishlists/Wishlists.tsx";
import {Page} from "@/components/Page.tsx";
import {useNavigate, useParams} from "react-router";
import {loadFriendWishlists} from "@/hooks/loadFriendWishlists.ts";
import {ServiceWishlist} from "@/backend-client";
// import {ErrorSnackbarProps} from "@/components/ErrorSnackbar/ErrorSnackbar.tsx";

export const FriendWishlistsPage: FC = () => {
  // const [errorSnackbarProps, setErrorSnackbarProps] = useState<ErrorSnackbarProps | undefined>(undefined)

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
