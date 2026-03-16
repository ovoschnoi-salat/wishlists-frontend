import {
  Cell,
  Navigation, Section
} from '@telegram-apps/telegram-ui';
import {FC, memo} from 'react';
import {ServiceWishlistItem} from '@/backend-client';
import {Loading} from "@/components/Loading.tsx";
import {useTranslation} from "react-i18next";

// Use the ServiceWishlistItem type from backend-client
export type WishlistItem = ServiceWishlistItem;

interface WishlistItemsProps {
  items: WishlistItem[];
  isLoading: boolean;
  onItemClick: (item: WishlistItem) => void;
}

export const Wishes: FC<WishlistItemsProps> = memo(function WishlistItems({items, isLoading, onItemClick}) {
  const {t} = useTranslation();
  if (isLoading) {
    return <Loading/>;
  }

  if (items.length === 0) {
    return <Section header={t('wishlist.wishes')}><Cell>{t('wishlist.noWishes')}</Cell></Section>
  }

  return <Section header={t('wishlist.wishes')}>
    {items.map((item) => (
      <Cell
        key={item.id}
        onClick={() => onItemClick(item)}
        after={<Navigation/>}
      >
        {item.title}
      </Cell>
    ))}
  </Section>
});
