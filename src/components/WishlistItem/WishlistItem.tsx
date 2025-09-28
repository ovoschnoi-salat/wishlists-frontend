import {
  Section,
  Cell,
  Button,
  Text, Divider, Title, Placeholder,
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';
import {ServiceWishlistItem, ServiceWishlistItemLink} from "@/backend-client";
import {Icon24Link} from "@/icons/24";

interface WishlistItemProps {
  item: ServiceWishlistItem;
  isLoading: boolean;
  onEdit?: (item: ServiceWishlistItem) => void;
  onOpenLink?: (url: string) => void;
}

export const WishlistItem: FC<WishlistItemProps> = ({
                                                      item,
                                                      isLoading,
                                                    }) => {
  const handleOpenLink = (url: string) => {
    // if (item.link) {
    //   console.log("handleOpenLink")
    //   // onOpenLink?.(item.link);
    // }
    window.open(url, '_blank');
  };

  if (isLoading) {
    return <Placeholder
      description="Loading items..."
    >
      <img
        alt="Telegram sticker"
        className="blt0jZBzpxuR4oDhJc8s"
        src="https://xelene.me/telegram.gif"
      />
    </Placeholder>
  }

  return (
    <>
      {/* Title Section */}
      <Title weight="2">
        {item.title}
      </Title>

      {/* Content Section */}
      <Section header="About">

        {/* Description */}
        <Cell subhead="Description">
          {item.description}
        </Cell>
        <Divider/>

        {/* Price */}
        {item.price && (
          <>
            <Cell subhead="Price">
              {item.price}
            </Cell>
          </>
        )}
        <Divider/>
        {/* Link */}
        {item.links && (
          <>
            {item.links.map((link: ServiceWishlistItemLink) => (
              <Cell
                subhead="Link"
                after={<Button mode="filled" size="s" onClick={() => handleOpenLink(link.url!)} before={<Icon24Link/>}>
                  Open
                </Button>
                }>
                {link.title}
              </Cell>
            ))}
          </>
        )}

        <Divider/>
        {/* Reservation Status */}
        <Cell subhead="Reservation">
          <Text>
            Reservable TODO
          </Text>
        </Cell>

      </Section>
    </>
  );
};

