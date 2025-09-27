import {
  Section,
  Cell,
  List,
  Button,
  Text, Divider, Title, Placeholder,
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';
import {ServiceWishlistItem, ServiceWishlistItemLink} from "@/backend-client";

// Icons - we'll need to create these or use existing ones
const LinkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EditIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

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
  const handleEdit = () => {
    // onEdit?.(item);
    console.log("handleEdit")
  };

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
    <List>

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
                after={<Button mode="filled" size="s" onClick={() => handleOpenLink(link.url!)} before={<LinkIcon/>}>
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

      {/* Edit Button */}
      <Button
        mode="filled"
        size="m"

        stretched
        onClick={handleEdit}
        before={<EditIcon/>}
      >
        <Text>Edit</Text>
      </Button>
    </List>
  );
};

