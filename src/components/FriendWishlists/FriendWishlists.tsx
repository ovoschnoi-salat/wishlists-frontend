import {
  Cell, Navigation
} from '@telegram-apps/telegram-ui';
import {FC, memo} from 'react';
import {ServiceFriendWishlist} from '@/backend-client';
import {Loading} from "@/components/Loading.tsx";
import {useTranslation} from "react-i18next";

export type Wishlist = ServiceFriendWishlist;

interface FriendWishlistsProps {
  wishlists: Wishlist[];
  isLoading: boolean;
  onWishlistClick: (wishlist: Wishlist) => void;
}

export const FriendWishlists: FC<FriendWishlistsProps> = memo(function FriendWishlists({wishlists, isLoading, onWishlistClick}) {
  const {t} = useTranslation();
  if (isLoading) {
    return <Loading/>;
  }

  if (wishlists.length === 0) {
    return <Cell>
      {t('wishlists.noWishlists')}
    </Cell>
  }

  return wishlists.map((wishlist) =>
      <Cell
        key={wishlist.id}
        after={<Navigation/>}
        onClick={() => onWishlistClick(wishlist)}
      >
        {wishlist.title}
      </Cell>
    )
});
