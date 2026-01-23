import {
  Section,
  Cell,
  Button,
  Text, Divider, Title, ButtonCell,
} from '@telegram-apps/telegram-ui';
import {FC, memo, useCallback} from 'react';
import {ServiceWishlistItem, ServiceWishlistItemLink} from "@/backend-client";
import {Icon24Edit, Icon24Link} from "@/icons/24";
import {Loading} from "@/components/Loading.tsx";
import {openLink} from "@tma.js/sdk-react";

interface WishlistItemProps {
  item: ServiceWishlistItem;
  isLoading: boolean;
  onPressEdit: () => void;
}

export const WishlistItem: FC<WishlistItemProps> = memo(function WishlistItem({item, isLoading, onPressEdit}) {
  const handleOpenLink = useCallback((url: string) => {
    openLink(url)
  }, []);

  if (isLoading) {
    return <Loading/>
  }

  return (
    <>
      {/* Title Section */}
      <Section header="Title">
        <Cell>
          <Title level="3">
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
          <Text>
            {item.reservable ? "This item is reservable" : "This item is free of reservation"}
          </Text>
        </Cell>

        {onPressEdit && <>
          <Divider/>

          <ButtonCell
           onClick={onPressEdit}
           before={<Icon24Edit/>}
          >
            <Text>Edit wish</Text>
          </ButtonCell>
        </>
        }

      </Section>
    </>
  );
});

