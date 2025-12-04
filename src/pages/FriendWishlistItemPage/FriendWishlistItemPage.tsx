import {useLocation} from 'react-router';
import {FC, memo, useCallback, useState} from 'react';
import {Page} from "@/components/Page.tsx";
import {Cell, List} from "@telegram-apps/telegram-ui";
import {FriendWishlistItem} from "@/components/FriendWishlistItem";
import {
  postApiUserFriendWishlistWishReservationCancel,
  postApiUserFriendWishlistWishReservationReserve, ServiceFriendWishlistItem, SubcodeErrorsResponse
} from "@/backend-client";
import {useBackendFriendWishlistItem} from "@/hooks/useBackendFriendWishlistItem.ts";
import {BackendErrorHandler} from "@/components/BackendErrorHandler/BackendErrorHandler.tsx";

export const FriendWishlistItemPage: FC = memo(function FriendWishlistItemPage() {
  const {state} = useLocation()
  const itemFromState = state as ServiceFriendWishlistItem | undefined

  const {item, error, resetError, refetch} = useBackendFriendWishlistItem(itemFromState)

  const [reservationError, setReservationError] = useState<SubcodeErrorsResponse | undefined>()
  const [isReservationLoading, setIsReservationLoading] = useState(false)

  const handlePressReservation = useCallback(async () => {
    if (!item || !item.reservable || (item.reserved && !item.reservation_can_be_canceled)) {
      return
    }

    setIsReservationLoading(true)
    if (!item.reserved) {

      const {error} = await postApiUserFriendWishlistWishReservationReserve({
        query: {
          wish_id: item.id!
        }
      })
      if (error) {
        setIsReservationLoading(false)
        setReservationError(error)
        return
      }
    } else {
      const {error} = await postApiUserFriendWishlistWishReservationCancel({
        query: {
          wish_id: item.id!
        }
      })

      if (error) {
        setIsReservationLoading(false)
        setReservationError(error)
        return
      }
    }

    setIsReservationLoading(false)
    refetch()
  }, [item])

  if (!item) {
    return <Cell>
      Wish not found
    </Cell>
  }

  return <Page>
    <BackendErrorHandler error={error} resetError={resetError}/>
    <BackendErrorHandler error={reservationError} resetError={setReservationError}/>

    <List>
      <FriendWishlistItem item={item} onPressReservation={handlePressReservation} isReservationLoading={isReservationLoading}/>
    </List>
  </Page>
});
