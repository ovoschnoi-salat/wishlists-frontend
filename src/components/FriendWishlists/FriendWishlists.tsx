import {
  Cell, Navigation
} from '@telegram-apps/telegram-ui';
import {FC, memo} from 'react';
import {ServiceFriendWishlist} from '@/backend-client';
import {Loading} from "@/components/Loading.tsx";

export type Wishlist = ServiceFriendWishlist;

interface FriendWishlistsProps {
  wishlists: Wishlist[];
  isLoading: boolean;
  onWishlistClick: (wishlist: Wishlist) => void;
}

export const FriendWishlists: FC<FriendWishlistsProps> = memo(function FriendWishlists({wishlists, isLoading, onWishlistClick}) {
  if (isLoading) {
    return <Loading/>;
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
