import {
  Section,
  Cell,
  Button,
  Title,
} from '@telegram-apps/telegram-ui';
import {FC, memo, ReactNode, useCallback} from 'react';
import {ServiceFriendWishlistItem, ServiceWishlistItemLink} from "@/backend-client";
import {Icon24Link} from "@/icons/24";
import {openLink} from "@tma.js/sdk-react";
import {StretchedButton} from "@/components/StretchedButton/StretchedButton.tsx";
import {useTranslation} from "react-i18next";

interface FriendWishlistItemProps {
  item: ServiceFriendWishlistItem;
  onPressReservation: () => void;
  isReservationLoading: boolean;
}

export const FriendWish: FC<FriendWishlistItemProps> = memo(function FriendWishlistItem({
                                                                                          item,
                                                                                          onPressReservation,
                                                                                          isReservationLoading
                                                                                        }) {
  const {t} = useTranslation();

  const handleOpenLink = useCallback((url: string) => {
    openLink(url)
  }, []);

  const cells = []
  {/* Description */
  }
  if (item.description) {
    cells.push([
      <Cell key="description" subhead={t('wish.description')}>
        {item.description}
      </Cell>
    ])
  }

  if (item.price) {
    cells.push([
      <Cell key="price" subhead={t('wish.price')}>
        {item.price}
      </Cell>
    ])
  }

  if (item.links) {
    cells.push(
      item.links.map((link: ServiceWishlistItemLink, index) => (
        <Cell
          key={"link-" + index}
          subhead={t('wish.link')}
          after={
            <Button
              mode="filled"
              size="s"
              onClick={() => handleOpenLink(link.url!)}
              before={<Icon24Link/>}>
              {t('wish.openLink')}
            </Button>
          }>
          {link.title}
        </Cell>
      ))
    )
  }

  const reservationCells: ReactNode[] = [
    <Cell key="reservaion-info">
      {
        item.reservable ?
          (
            item.reserved ?
              (
                item.reservation_can_be_canceled ? t('wish.ownReservationText') : t('wish.reservedText')
              )
              :
              t('wish.canBeReservedText')
          )
          :
          t('wish.reservationFreeText')
      }
    </Cell>
  ]

  if (item.reservable && (!item.reserved || item.reservation_can_be_canceled)) {
    reservationCells.push([
      <StretchedButton
        key="reserve"
        size="m"
        mode="filled"
        stretched
        disabled={isReservationLoading}
        onClick={onPressReservation}
      >
        {item.reservation_can_be_canceled ? t('wish.cancelReservation') : t('wish.reserve')}
      </StretchedButton>
    ])
  }

  return (
    <>
      {/* Title Section */}
      <Section header={t('wish.title')}>
        <Cell>
          <Title level="2">
            {item.title}
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
    </>
  );
});

