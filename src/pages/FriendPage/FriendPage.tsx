import {
  ButtonCell,
  Cell,
  List, Section,
} from '@telegram-apps/telegram-ui';
import {FC, memo, useCallback, useState} from 'react';

import {Page} from "@/components/Page.tsx";
import {useLocation, useNavigate, useParams} from "react-router";
import {useBackendFriendWishlists} from "@/hooks/useBackendFriendWishlists.tsx";
import {deleteApiUserFriend, ServiceFriend, ServiceWishlist} from "@/backend-client";
import {FriendWishlists} from "@/components/FriendWishlists/FriendWishlists.tsx";
import {Icon28Cancel} from "@/icons/28/Cancel.tsx";
import {toast} from "react-hot-toast";
import {ToastBackendError} from "@/components/ToastBackendError/ToastBackendError.tsx";
import {popup} from "@tma.js/sdk-react";

export const FriendPage: FC = memo(function FriendWishlistsPage() {
  const navigate = useNavigate()
  const [isRemoving, setIsRemoving] = useState(false)

  const {state} = useLocation()
  const friend = state as ServiceFriend | undefined

  const handleRemoveFromFriendsPress = useCallback(async () => {
    try {
      setIsRemoving(true)

      const promise = popup.show({
        title: 'Remove friend',
        message: `Remove @${friend?.username} from friends?`,
        buttons: [
          {id: 'yes', type: 'destructive', text: 'Yes'},
          {id: 'no', type: 'default', text: 'No'}
        ],
      });

      const buttonId = await promise;
      if (buttonId !== "yes") {
        return
      }

      const toastId = toast.loading("Removing from friends...")

      const {error} = await deleteApiUserFriend({
        query: {
          friend_id: friend!.id!,
        }
      })

      if (error) {
        toast.error(<ToastBackendError error={error}/>, {id: toastId})
        return
      }

      toast.success("Removed from friends successfully", {id: toastId})

      navigate(`../..`, {replace: true, relative: "path"})
    } finally {
      setIsRemoving(false)
    }
  }, [friend, navigate]);

  const handleWishlistPress = useCallback((wishlist: ServiceWishlist) => {
    navigate(`../wishlists/${wishlist.id}/items`, {state: wishlist, relative: "path"});
  }, [navigate]);

  const {friendId} = useParams<{ friendId: string }>();

  const friendIdNumber = parseInt(friendId ?? "0", 10);

  const {wishlists, isLoading} = useBackendFriendWishlists(friendIdNumber);

  if (!friend) {
    return <Page>
      <List>
        <Cell>Wrong state</Cell>
      </List>
    </Page>
  }

  return <Page>
    <List>
      <Section header={"Friend"}>
        {friend.name &&
         <Cell subhead="Name">
           {friend.name}
         </Cell>
        }

        <Cell subhead="Username">
          {"@" + friend.username}
        </Cell>

        <ButtonCell
          disabled={isRemoving}
          mode="destructive"
          before={<Icon28Cancel/>}
          onClick={handleRemoveFromFriendsPress}
        >
          Remove from friends
        </ButtonCell>
      </Section>

      <Section header={"Friend wishlists"}>
        <FriendWishlists wishlists={wishlists} isLoading={isLoading || isRemoving}
                         onWishlistClick={handleWishlistPress}/>
      </Section>
    </List>
  </Page>
});
