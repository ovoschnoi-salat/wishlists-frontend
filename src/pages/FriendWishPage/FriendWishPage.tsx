import {useLocation} from 'react-router';
import {FC, memo, useCallback, useState} from 'react';
import {Page} from "@/components/Page.tsx";
import {Cell, List} from "@telegram-apps/telegram-ui";
import {FriendWish} from "@/components/FriendWish";
import {
  postApiUserFriendWishlistWishReservationCancel,
  postApiUserFriendWishlistWishReservationReserve, postApiUserFriendWishlistWishSplitRequest,
  ServiceFriendWishlist,
  ServiceFriendWishlistItem,
} from "@/backend-client";
import {toast} from "react-hot-toast";
import {ToastBackendError} from "@/components/ToastBackendError/ToastBackendError.tsx";
import {useTranslation} from "react-i18next";
import {useBackendWishSplitRequests} from "@/hooks/useBackendWishSplitRequests.tsx";
import {Loading} from "@/components/Loading.tsx";
import {useBackendFriendWishlistItem} from "@/hooks/useBackendFriendWishlistItem.tsx";

export type FriendWishPageState = {
  wishlist: ServiceFriendWishlist
  wish: ServiceFriendWishlistItem
}

export const FriendWishPage: FC = memo(function FriendWishlistItemPage() {
  const {t} = useTranslation();

  const state = useLocation().state as FriendWishPageState

  const wishlist = state.wishlist

  if (!state.wishlist || !state.wish) {
    throw t('invalidState')
  }

  const {wish, refetch} = useBackendFriendWishlistItem(state.wish)

  const [isSplitRequestLoading, setIsSplitRequestLoading] = useState(false)
  const [isReservationLoading, setIsReservationLoading] = useState(false)

  const {split_requests, isLoading, refetch: refetchSplitRequests} = useBackendWishSplitRequests(state.wish.id!)

  const handleCreateSplitRequest = useCallback(async () => {
    if (!wish) {
      return
    }
    try {
      setIsSplitRequestLoading(true)
      const toastId = toast.loading(t('wish.toast.reserving'))

      const {error} = await postApiUserFriendWishlistWishSplitRequest({
        query: {
          wish_id: wish.id!
        }
      })
      if (error) {
        toast.error(<ToastBackendError error={error}/>, {id: toastId})
        return
      }

      toast.success(t('wish.toast.reserved'), {id: toastId})
      await refetchSplitRequests()
    } finally {
      setIsSplitRequestLoading(false)
    }
  },[refetchSplitRequests, t, wish])

  const handlePressReservation = useCallback(async () => {
    if (!wish || !wish.reservable || (wish.reserved && !wish.reservation_can_be_canceled)) {
      return
    }

    try {
      setIsReservationLoading(true)
      if (!wish.reserved) {
        const toastId = toast.loading(t('wish.toast.reserving'))

        const {error} = await postApiUserFriendWishlistWishReservationReserve({
          query: {
            wish_id: wish.id!
          }
        })
        if (error) {
          toast.error(<ToastBackendError error={error}/>, {id: toastId})
          return
        }

        toast.success(t('wish.toast.reserved'), {id: toastId})
      } else {
        const toastId = toast.loading(t('wish.toast.cancelingReservation'))

        const {error} = await postApiUserFriendWishlistWishReservationCancel({
          query: {
            wish_id: wish.id!
          }
        })

        if (error) {
          toast.error(<ToastBackendError error={error}/>, {id: toastId})
          return
        }

        toast.success(t('wish.toast.reservationCanceled'), {id: toastId})
      }

      await refetch()
    } finally {
      setIsReservationLoading(false)
    }
  }, [wish, refetch, t])

  if (!wish) {
    return <Page>
      <Cell>
        {t('wish.loadingError')}
      </Cell>
    </Page>
  }

  if (isLoading) {
    return <Loading/>
  }

  return <Page>
    <List>
      <FriendWish
        wish={wish}
        wishlist={wishlist}
        split_requests={split_requests}
        onPressReservation={handlePressReservation}
        isReservationLoading={isReservationLoading}
        onCreateSplitRequest={handleCreateSplitRequest}
        isSplitRequestLoading={isSplitRequestLoading}
      />
    </List>
  </Page>
});
