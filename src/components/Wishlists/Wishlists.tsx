import {
  Cell, Navigation
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';
import {ServiceWishlist} from '@/backend-client';
import {Loading} from "@/components/Loading.tsx";

// Use the ServiceWishlistItem type from backend-client
export type Wishlist = ServiceWishlist;

interface WishlistsProps {
  wishlists: Wishlist[];
  isLoading: boolean;
  onWishlistClick: (wishlistId: number) => void;
}

export const Wishlists: FC<WishlistsProps> = ({wishlists, isLoading, onWishlistClick}) => {
  if (isLoading) {
    return <Loading/>;
  }

  return wishlists.map((wishlist) =>
      <Cell
        key={wishlist.id}
        after={<Navigation/>}
        subtitle={wishlist.is_private ? `Private` : undefined}
        onClick={() => onWishlistClick(wishlist.id!)}
      >
        {wishlist.title}
      </Cell>
    )
};
