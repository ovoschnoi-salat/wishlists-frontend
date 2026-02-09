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
import {useTranslation} from "react-i18next";

interface WishlistItemProps {
  item: ServiceWishlistItem;
  isLoading: boolean;
  onPressEdit: () => void;
}

export const WishlistItem: FC<WishlistItemProps> = memo(function WishlistItem({item, isLoading, onPressEdit}) {
  const {t} = useTranslation()

  const handleOpenLink = useCallback((url: string) => {
    openLink(url)
  }, []);

  const cells = []

  if (item.description) {
    cells.push([
      <Cell key="description" subhead={t('wish.description')} multiline={true}>
        {item.description}
      </Cell>
    ])
  }

  if (item.price) {
    cells.push([
      <Cell key="price" subhead={t('wish.price')} multiline={true}>
        {item.price}
      </Cell>
    ])
  }

  if (item.links) {
    cells.push(
      item.links.map((link: ServiceWishlistItemLink, index) => {
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
              onClick={() => handleOpenLink(link.url!)}
              before={<Icon24Link/>}>
              {t('wish.openLink')}
            </Button>
          }>
          {title}
        </Cell>
      })
    )
  }

  cells.push([
    <Cell key="reservation" subhead={t('wish.reservation')} multiline={true}>
      <Text>
        {item.reservable ? t('wish.reservableText') : t('wish.reservationFreeText')}
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
        {t('wish.edit')}
      </ButtonCell>
    ])
  }

  if (isLoading) {
    return <Loading/>
  }

  return (
    <>
      {/* Title Section */}
      <Section header={t('wish.title')}>
        <Cell multiline={true}>
          <Title level="3">
            {item.title}
          </Title>
        </Cell>
      </Section>

      {/* Content Section */}
      <Section header={t('wish.about')}>
        {...cells}
      </Section>
    </>
  );
});

