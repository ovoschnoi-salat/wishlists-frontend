import {
  Cell, Section, Switch
} from '@telegram-apps/telegram-ui';
import {FC, useState} from 'react';
import {ServiceWishlist} from '@/backend-client';
import {Loading} from "@/components/Loading.tsx";

// Use the ServiceWishlistItem type from backend-client
export type Wishlist = ServiceWishlist;

interface WishlistsProps {
  isLoading: boolean;
}

export const Settings: FC<WishlistsProps> = ({isLoading}) => {
  const [openToFriendsRequests, setOpenToFriendsRequests] = useState(false)

  if (isLoading) {
    return <Loading/>;
  }

  return <Section>

    <Cell
      after={
        <Switch
          checked={openToFriendsRequests}
          onChange={(event) => setOpenToFriendsRequests(event.target.checked)}
        />
      }
    >
      Open to friends requests
    </Cell>
  </Section>
};
