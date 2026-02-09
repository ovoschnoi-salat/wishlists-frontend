import {
  ButtonCell,
  Cell,
  List, Section,
} from '@telegram-apps/telegram-ui';
import {FC, memo, useCallback, useState} from 'react';

import {Page} from "@/components/Page.tsx";
import {useLocation, useNavigate} from "react-router";
import {useBackendFriendWishlists} from "@/hooks/useBackendFriendWishlists.tsx";
import {deleteApiUserFriend, ServiceFriend, ServiceWishlist} from "@/backend-client";
import {FriendWishlists} from "@/components/FriendWishlists/FriendWishlists.tsx";
import {Icon28Cancel} from "@/icons/28/Cancel.tsx";
import {toast} from "react-hot-toast";
import {ToastBackendError} from "@/components/ToastBackendError/ToastBackendError.tsx";
import {popup} from "@tma.js/sdk-react";
import {useTranslation} from "react-i18next";

export const FriendPage: FC = memo(function FriendWishlistsPage() {
  const navigate = useNavigate()
  const {t} = useTranslation();
  const [isRemoving, setIsRemoving] = useState(false)

  const {state} = useLocation()
  const friend = state as ServiceFriend | undefined

  if (!friend) {
    throw t('invalidState')
  }

  const handleRemoveFromFriendsPress = useCallback(async () => {
    try {
      setIsRemoving(true)

      const promise = popup.show({
        title: t('friend.remove'),
        message: t('friend.removeQuestion', friend),
        buttons: [
          {id: 'yes', type: 'destructive', text: t('yes')},
          {id: 'no', type: 'default', text: t('no')}
        ],
      });

      const buttonId = await promise;
      if (buttonId !== "yes") {
        console.log("returned from popup", buttonId)
        return
      }

      const toastId = toast.loading(t('friend.toast.removing'))

      const {error} = await deleteApiUserFriend({
        query: {
          friend_id: friend.id!,
        }
      })

      if (error) {
        toast.error(<ToastBackendError error={error}/>, {id: toastId})
        return
      }

      toast.success(t('friend.toast.removed'), {id: toastId})

      navigate(`/friends`, {replace: true})
    } finally {
      setIsRemoving(false)
    }
  }, [friend, navigate, t]);

  const handleWishlistPress = useCallback((wishlist: ServiceWishlist) => {
    navigate(`wishlist`, {state: wishlist});
  }, [navigate]);

  const {wishlists, isLoading} = useBackendFriendWishlists(friend.id!);

  const friendCells = []

  if (friend.name) {
    friendCells.push([
      <Cell key="name" subhead={t('friend.name')}>
        {friend.name}
      </Cell>
    ])
  }
  if (friend.username) {
    friendCells.push([
      <Cell key="username" subhead={t('friend.username')}>
        {"@" + friend.username}
      </Cell>
    ])
  } else {
    friendCells.push([
      <Cell key="id" subhead="id">
        {friend.id}
      </Cell>
    ])
  }
  friendCells.push([
    <ButtonCell
      key="remove"
      disabled={isRemoving}
      mode="destructive"
      before={<Icon28Cancel/>}
      onClick={handleRemoveFromFriendsPress}
    >
      {t('friend.remove')}
    </ButtonCell>
  ])

  return <Page>
    <List>
      <Section header={t('friend.friend')}>
        {...friendCells}
      </Section>

      <Section header={t('wishlists.friendWishlists')}>
        <FriendWishlists
          wishlists={wishlists}
          isLoading={isLoading || isRemoving}
          onWishlistClick={handleWishlistPress}
        />
      </Section>
    </List>
  </Page>
});
