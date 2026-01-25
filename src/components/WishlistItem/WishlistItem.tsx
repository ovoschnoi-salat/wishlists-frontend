import {
  Section,
  Cell,
  Button,
  Text,
  Title,
  ButtonCell,
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

  const cells = []

  if (item.description) {
    cells.push([
      <Cell key="description" subhead="Description">
        {item.description}
      </Cell>
    ])
  }

  if (item.price) {
    cells.push([
      <Cell key="price" subhead="Price">
        {item.price}
      </Cell>
    ])
  }

  if (item.links) {
    cells.push(item.links.map((link: ServiceWishlistItemLink, index) => (
      <Cell
        key={"link-" + index}
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
    )))
  }

  cells.push([
    <Cell key="reservation" subhead="Reservation">
      <Text>
        {item.reservable ? "This item is reservable" : "This item is free of reservation"}
      </Text>
    </Cell>
  ])

  if (onPressEdit) {
    cells.push([
      <ButtonCell
        key="edit"
        onClick={onPressEdit}
        before={<Icon24Edit/>}
      >
        Edit wish
      </ButtonCell>
    ])
  }

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
        {...cells}
      </Section>
    </>
  );
});

