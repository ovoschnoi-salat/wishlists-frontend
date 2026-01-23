import {useLocation} from 'react-router';
import {FC, memo, useCallback, useState} from 'react';
import {Page} from "@/components/Page.tsx";
import {Cell, List} from "@telegram-apps/telegram-ui";
import {FriendWish} from "@/components/FriendWish";
import {
  postApiUserFriendWishlistWishReservationCancel,
  postApiUserFriendWishlistWishReservationReserve,
  ServiceFriendWishlistItem,
} from "@/backend-client";
import {useBackendFriendWishlistItem} from "@/hooks/useBackendFriendWishlistItem.tsx";
import {toast} from "react-hot-toast";
import {ToastBackendError} from "@/components/ToastBackendError/ToastBackendError.tsx";

export const FriendWishPage: FC = memo(function FriendWishlistItemPage() {
  const {state} = useLocation()
  const itemFromState = state as ServiceFriendWishlistItem | undefined

  const {item, refetch} = useBackendFriendWishlistItem(itemFromState)

  const [isReservationLoading, setIsReservationLoading] = useState(false)

  const handlePressReservation = useCallback(async () => {
    if (!item || !item.reservable || (item.reserved && !item.reservation_can_be_canceled)) {
      return
    }

    setIsReservationLoading(true)
    if (!item.reserved) {
      const toastId = toast.loading("Reserving wish...")

      const {error} = await postApiUserFriendWishlistWishReservationReserve({
        query: {
          wish_id: item.id!
        }
      })
      if (error) {
        setIsReservationLoading(false)
        toast.error(
          <ToastBackendError
            error={error}
          />,
          {id: toastId})
        return
      }

      toast.success("Wish reserved successfully", {id: toastId})
    } else {
      const toastId = toast.loading("Canceling wish reservation...")

      const {error} = await postApiUserFriendWishlistWishReservationCancel({
        query: {
          wish_id: item.id!
        }
      })

      if (error) {
        setIsReservationLoading(false)
        toast.error(
          <ToastBackendError
            error={error}
          />,
          {id: toastId})
        return
      }

      toast.success("Wish reservation canceled successfully", {id: toastId})
    }

    setIsReservationLoading(false)
    refetch()
  }, [item, refetch])

  if (!item) {
    return <Cell>
      Error loading wish
    </Cell>
  }

  return <Page>
    <List>
      <FriendWish item={item} onPressReservation={handlePressReservation} isReservationLoading={isReservationLoading}/>
    </List>
  </Page>
});
