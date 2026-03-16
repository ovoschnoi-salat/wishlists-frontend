import {
  Badge,
  Cell,
  Navigation
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';
import {ServiceFriendWishlistItem} from '@/backend-client';
import {Loading} from "@/components/Loading.tsx";
import {useTranslation} from "react-i18next";

export type WishlistItem = ServiceFriendWishlistItem;

interface FriendWishlistItemsProps {
  items: WishlistItem[];
  isLoading: boolean;
  onItemClick: (item: WishlistItem) => void;
}

export const FriendWishes: FC<FriendWishlistItemsProps> = ({items, isLoading, onItemClick}) => {
  const {t} = useTranslation();

  if (isLoading) {
    return <Loading/>;
  }

  if (items.length === 0) {
    return <Cell>{t('wishlist.noWishes')}</Cell>
  }

  return items.map((item) => (
    <Cell
      key={item.id}
      onClick={() => onItemClick(item)}
      titleBadge={item.reserved === true ? <Badge mode={item.reservation_can_be_canceled ? "primary" : "critical"} type="dot" /> : undefined}
      after={<Navigation/>}
      disabled={item.reserved === true && item.reservation_can_be_canceled === false} // TODO
    >
      {item.title}
    </Cell>
  ))
};
