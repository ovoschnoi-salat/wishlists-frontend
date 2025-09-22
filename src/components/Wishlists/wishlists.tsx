import {
  Cell, Section, Navigation, Placeholder
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';
import {useNavigate} from "react-router-dom";
import {ServiceWishlist} from '@/backend-client';

// Use the ServiceWishlistItem type from backend-client
export type Wishlist = ServiceWishlist;

interface WishlistsProps {
  wishlists: Wishlist[];
  isLoading: boolean;
  onAddItem?: () => void;
}

export const Wishlists: FC<WishlistsProps> = ({
                                                wishlists,
                                                isLoading,
                                              }) => {
  let navigate = useNavigate()


  const handleWishlistPress = (wishlistId: number) => {
    navigate(`/wishlists/${wishlistId}`);
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
    </Placeholder>;
  }

  return <Section
    header='My Lists'
  >
    {wishlists.map((wishlist) => (
      <Cell
        key={wishlist.id}
        after={<Navigation/>}
        subtitle={wishlist.is_private ? `Private` : undefined}
        onClick={() => handleWishlistPress(wishlist.id!)}
      >
        {wishlist.title}
      </Cell>
    ))}
  </Section>;
};
