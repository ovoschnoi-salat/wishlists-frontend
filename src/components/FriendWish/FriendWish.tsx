import {
  Section,
  Cell,
  Button,
  Title,
} from '@telegram-apps/telegram-ui';
import {FC, memo, ReactNode} from 'react';
import {
  ServiceFriendWishlist,
  ServiceFriendWishlistItem,
  ServiceWishlistItemLink
} from "@/backend-client";
import {Icon24Link} from "@/icons/24";
import {openLink} from "@tma.js/sdk-react";
import {StretchedButton} from "@/components/StretchedButton/StretchedButton.tsx";
import {useTranslation} from "react-i18next";
import {WishSplitRequests} from "@/components/WishSplitRequests/WishSplitRequests.tsx";

interface FriendWishlistItemProps {
  wish: ServiceFriendWishlistItem;
  wishlist: ServiceFriendWishlist;
  onPressReservation: () => void;
  isReservationLoading: boolean;
}

export const FriendWish: FC<FriendWishlistItemProps> = memo(function FriendWishlistItem({
                                                                                          wish,
                                                                                          wishlist,
                                                                                          onPressReservation,
                                                                                          isReservationLoading,
                                                                                        }) {
  const {t} = useTranslation();

  const cells = []

  if (wish.description) {
    cells.push([
      <Cell key="description" subhead={t('wish.description')} multiline={true}>
        {wish.description}
      </Cell>
    ])
  }

  if (wish.price) {
    cells.push([
      <Cell key="price" subhead={t('wish.price')} multiline={true}>
        {wish.price}
      </Cell>
    ])
  }

  if (wish.links) {
    cells.push(
      wish.links.map((link: ServiceWishlistItemLink, index) => {
        let title = link.title
        if (!title && "parse" in URL) {
          title = URL.parse(link.url ?? "")?.hostname
        }
        return <Cell
          key={"link-" + index}
          subhead={t('wish.link')}
          after={
            <Button
              mode="filled"
              size="s"
              onClick={() => openLink(link.url!)}
              before={<Icon24Link/>}>
              {t('wish.openLink')}
            </Button>
          }>
          {title}
        </Cell>
      })
    )
  }

  const reservationCells: ReactNode[] = [
    <Cell key="reservaion-info" multiline={true}>
      {
        wish.reservable ?
          wish.reserved ?
            wish.reservation_can_be_canceled ?
              t('wish.ownReservationText')
              :
              t('wish.reservedText')
            :
            t('wish.canBeReservedText')
          :
          t('wish.reservationFreeText')
      }
    </Cell>
  ]

  if (wish.reservable && (!wish.reserved || wish.reservation_can_be_canceled)) {
    reservationCells.push([
      <StretchedButton
        key="reserve"
        size="m"
        mode="filled"
        stretched
        disabled={isReservationLoading}
        onClick={onPressReservation}
      >
        {wish.reservation_can_be_canceled ? t('wish.cancelReservation') : t('wish.reserve')}
      </StretchedButton>
    ])
  }

  return (
    <>
      {/* Title Section */}
      <Section header={t('wish.title')}>
        <Cell multiline={true}>
          <Title level="2">
            {wish.title}
          </Title>
        </Cell>
      </Section>

      {/* Description Section */}
      {cells.length > 0 && <Section header={t('wish.about')}>
        {...cells}
      </Section>}

      {/* Reservation Section */}
      <Section header={t('wish.reservation')}>
        {...reservationCells}
      </Section>

      {/* Split Requests Section */}
      <WishSplitRequests wishlist={wishlist} wish={wish}/>
    </>
  );
});

