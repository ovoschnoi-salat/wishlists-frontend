import {
  Section,
  Cell,
  Button,
  Divider,
  Title,
} from '@telegram-apps/telegram-ui';
import {FC, memo, useCallback} from 'react';
import {ServiceFriendWishlistItem, ServiceWishlistItemLink} from "@/backend-client";
import {Icon24Link} from "@/icons/24";
import {openLink} from "@tma.js/sdk-react";

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
  const handleOpenLink = useCallback((url: string) => {
    openLink(url)
  }, []);

  return (
    <>
      {/* Title Section */}
      <Section header="Title">
        <Cell>
          <Title level="2">
            {item.title}
          </Title>
        </Cell>
      </Section>


      {/* Content Section */}
      <Section header="About">

        {/* Description */}
        {item.description &&
         <>
           <Cell subhead="Description">
             {item.description}
           </Cell>
           <Divider/>
         </>
        }

        {/* Price */}
        {item.price && (
          <>
            <Cell subhead="Price">
              {item.price}
            </Cell>
            <Divider/>
          </>
        )}
        {/* Link */}
        {item.links && (
          <>
            {item.links.map((link: ServiceWishlistItemLink) => (
              <>
                <Cell
                  subhead="Link"
                  after={
                    <Button
                      mode="filled"
                      size="s"
                      onClick={() => handleOpenLink(link.url!)}
                      before={<Icon24Link/>}>
                      Open
                    </Button>
                  }>
                  {link.title}
                </Cell>
                <Divider/>
              </>
            ))}
          </>
        )}

        <Cell subhead="Reservation">
          {item.reservable ?
            (item.reserved ?
                (item.reservation_can_be_canceled ?
                    "This wish is reserved by you" :
                    "This wish is already reserved"
                )
                : "This item is reservable"
            )
            : "This item is free of reservation"
          }
        </Cell>
        {
          item.reservable && (!item.reserved || item.reservation_can_be_canceled) && <>
           <div className="px-6 py-4">
             <Button size="m" mode="filled" stretched disabled={isReservationLoading} onClick={onPressReservation}>
               {item.reservation_can_be_canceled ? "Undo reservation" : "Reserve"}
             </Button>
           </div>
         </>
        }

      </Section>
    </>
  );
});

