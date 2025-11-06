import {
  List,
  Section,
  ButtonCell,
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';

import {loadWishlists} from "@/hooks/loadWishlists.ts";
import {Page} from "@/components/Page.tsx";
import {Loading} from "@/components/Loading.tsx";
import {Icon28Plus} from "@/icons/28/Plus.tsx";
import {useNavigate, useParams} from "react-router-dom";

export const WishlistSettingsPage: FC = () => {
  const {isLoading} = loadWishlists();//TODO

  const {wishlistId} = useParams<{ wishlistId: string }>();

  if (!wishlistId) {
    return <div>Wishlist ID not found</div>;
  }

  const wishlistIdNumber = parseInt(wishlistId, 10);

  if (isNaN(wishlistIdNumber)) {
    return <div>Invalid wishlist ID</div>;
  }

  const navigate = useNavigate()
  const handleSaveWishlistSettingsPress = () => {
    navigate(`/wishlist/${wishlistIdNumber}/items`);
  };

  if (isLoading) {
    return <Loading/>;
  }

  return <Page>
    <List>
      <Section header='Wishlists'>
        {/*TODO*/}

        <ButtonCell
          before={<Icon28Plus/>}
          onClick={handleSaveWishlistSettingsPress}
        >
          Save
        </ButtonCell>
      </Section>
    </List>
  </Page>
};
