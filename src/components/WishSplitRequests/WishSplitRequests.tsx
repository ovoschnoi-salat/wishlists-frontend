import {
  Cell,
  Avatar,
  Section,
  Accordion
} from '@telegram-apps/telegram-ui';
import {FC, memo, useCallback, useState} from 'react';
import {
  deleteApiUserFriendWishlistWishSplitRequest,
  postApiUserFriendWishlistWishSplitRequest,
  ServiceFriend, ServiceFriendWishlist, ServiceWishlistItem
} from '@/backend-client';
import {getAcronymFromNameOrUsername} from "@/helpers/acronym.ts";
import {StretchedButton} from "@/components/StretchedButton/StretchedButton.tsx";
import {useTranslation} from "react-i18next";
import {getFriendUsernameOrId} from "@/helpers/user.ts";
import {openLink} from "@tma.js/sdk-react";
import {useBackendWishSplitRequests} from "@/hooks/useBackendWishSplitRequests.tsx";
import {toast} from "react-hot-toast";
import {ToastBackendError} from "@/components/ToastBackendError/ToastBackendError.tsx";
import {LoadingSection} from "@/components/LoadingSection/LoadingSection.tsx";

export type Friend = ServiceFriend;

interface WishSplitRequestsProps {
  wishlist: ServiceFriendWishlist;
  wish: ServiceWishlistItem;
}

export const WishSplitRequests: FC<WishSplitRequestsProps> = memo(function SelectFriends({
                                                                                           wishlist,
                                                                                           wish,
                                                                                         }) {
  const {t} = useTranslation();
  const [openSplitRequests, setOpenSplitRequests] = useState(false)
  const [isSplitRequestLoading, setIsSplitRequestLoading] = useState(false)
  const {split_requests, isLoading, refetch} = useBackendWishSplitRequests(wish.id!)

  const handleCreateSplitRequest = useCallback(async () => {
    if (!wish) {
      return
    }
    try {
      setIsSplitRequestLoading(true)
      const toastId = toast.loading(t('wish.toast.creatingSplitRequest'))

      const {error} = await postApiUserFriendWishlistWishSplitRequest({
        query: {
          wish_id: wish.id!
        }
      })
      if (error) {
        toast.error(<ToastBackendError error={error}/>, {id: toastId})
        return
      }

      toast.success(t('wish.toast.createdSplitRequest'), {id: toastId})
      await refetch()
    } finally {
      setIsSplitRequestLoading(false)
    }
  }, [refetch, t, wish])

  const handleRemoveSplitRequest = useCallback(async () => {
    if (!wish) {
      return
    }
    try {
      setIsSplitRequestLoading(true)
      const toastId = toast.loading(t('wish.toast.removingSplitRequest'))

      const {error} = await deleteApiUserFriendWishlistWishSplitRequest({
        query: {
          wish_id: wish.id!
        }
      })
      if (error) {
        toast.error(<ToastBackendError error={error}/>, {id: toastId})
        return
      }

      toast.success(t('wish.toast.removedSplitRequest'), {id: toastId})
      await refetch()
    } finally {
      setIsSplitRequestLoading(false)
    }
  }, [refetch, t, wish])

  const onSplitRequestClick = (requester: ServiceFriend) => {
    openLink("tg://user?id=" + requester.id)
  };

  if (isLoading) {
    return <LoadingSection/>
  }

  return <Section
    header={t('wish.splitRequestsTitle')}
  >
    <Cell
      key="split-requests-info"
      multiline={true}
    >
      {
        t("wish.splitRequestsDescription")
      }
      <br/>
      {
        wishlist.split_request_privacy === "visible_to_owner" ?
          t("wish.splitRequestsVisibleToOwnerDescription") :
          t("wish.splitRequestsInvisibleToOwnerDescription")
      }
    </Cell>
    {split_requests.split_requests!.length > 0 &&
     <Accordion onChange={() => {
       setOpenSplitRequests((prev) => !prev)
     }} expanded={openSplitRequests}>
       <Accordion.Summary>
         {t('wish.splitRequestsTitle')}
       </Accordion.Summary>
       <Accordion.Content>
         {split_requests.split_requests!.map((friend) =>
           <Cell
             key={"split_request_from_" + friend.id}
             subtitle={friend.name ? getFriendUsernameOrId(friend) : undefined}
             before={
               <Avatar
                 size={28}
                 src={friend.photo_url}
                 acronym={getAcronymFromNameOrUsername(friend.name, friend.username)}
               />
             }
             onClick={() => onSplitRequestClick(friend)}
           >
             {friend.name ? friend.name : getFriendUsernameOrId(friend)}
           </Cell>
         )}
       </Accordion.Content>
     </Accordion>
    }
    {
      split_requests.request_from_user_exists ?
        <StretchedButton
          key="remove_split_request"
          size="m"
          mode="filled"
          stretched
          disabled={isSplitRequestLoading}
          onClick={handleRemoveSplitRequest}
        >
          {t('wish.removeSplitRequest')}
        </StretchedButton>
        :
        <StretchedButton
          key="create_split_request"
          size="m"
          mode="filled"
          stretched
          disabled={isSplitRequestLoading}
          onClick={handleCreateSplitRequest}
        >
          {t('wish.createSplitRequest')}
        </StretchedButton>

    }
  </Section>
});
