import {
  List,
  Section,
  ButtonCell,
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';

import {loadWishlists} from "@/hooks/loadWishlists.ts";
import {Wishlists} from "@/components/Wishlists/Wishlists.tsx";
import {Page} from "@/components/Page.tsx";
import {Loading} from "@/components/Loading.tsx";
import {Icon28Plus} from "@/icons/28/Plus.tsx";
import {useNavigate} from "react-router-dom";

export const WishlistsPage: FC = () => {
  const {wishlists, isLoading} = loadWishlists();

  const navigate = useNavigate()
  const handleNewWishlistPress = async () => {
    navigate(`/wishlists/new`)
  };
  const handleWishlistPress = (wishlistId: number) => {
    navigate(`/wishlist/${wishlistId}/items`);
  };

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <Page>
      <List>
        <Section header='Wishlists'>
          <Wishlists wishlists={wishlists} isLoading={isLoading} onWishlistClick={handleWishlistPress}/>

          <ButtonCell
            mode="filled"
            size="m"
            stretched
            before={<Icon28Plus/>}
            onClick={handleNewWishlistPress}
          >
            Add wishlist
          </ButtonCell>
        </Section>
      </List>
    </Page>
  );
};
