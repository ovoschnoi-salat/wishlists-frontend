import {
  Cell, Navigation
} from '@telegram-apps/telegram-ui';
import {FC, memo} from 'react';
import {ServiceWishlist} from '@/backend-client';
import {Loading} from "@/components/Loading.tsx";
import {useTranslation} from "react-i18next";

export type Wishlist = ServiceWishlist;

interface WishlistsProps {
  wishlists: Wishlist[];
  isLoading: boolean;
  onWishlistClick: (wishlist: Wishlist) => void;
}

export const Wishlists: FC<WishlistsProps> = memo(function Wishlists({wishlists, isLoading, onWishlistClick}) {
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
        subtitle={wishlist.is_private ? t('wishlist.private') : undefined}
        onClick={() => onWishlistClick(wishlist)}
      >
        {wishlist.title}
      </Cell>
    )
});
