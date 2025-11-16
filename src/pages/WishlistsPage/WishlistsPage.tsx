import {
  List,
  Section,
  ButtonCell,
} from '@telegram-apps/telegram-ui';
import {FC} from 'react';
import {useNavigate} from "react-router";

import {loadWishlists} from "@/hooks/loadWishlists.ts";
import {Wishlists} from "@/components/Wishlists/Wishlists.tsx";
import {Page} from "@/components/Page.tsx";
import {Loading} from "@/components/Loading.tsx";
import {Icon28Plus} from "@/icons/28/Plus.tsx";
import {ServiceWishlist} from "@/backend-client";
import {BackendErrorHandler} from "@/components/BackendErrorHandler/BackendErrorHandler.tsx";

export const WishlistsPage: FC = () => {
  const navigate = useNavigate()

  const {wishlists, isLoading, error, resetError} = loadWishlists();

  const handleNewWishlistPress = async () => {
    navigate(`/wishlists/new`)
  };
  const handleWishlistPress = (wishlist: ServiceWishlist) => {
    navigate(`/wishlist/${wishlist.id}/items`, {state: wishlist});
  };

  if (isLoading) {
    return <Loading/>;
  }

  return <Page pageTitle={"Your wishlists"}>
    <BackendErrorHandler error={error} resetError={resetError}/>
    <List>
      <Section header='Wishlists'>
        <Wishlists wishlists={wishlists} isLoading={isLoading} onWishlistClick={handleWishlistPress}/>

        <ButtonCell
          before={<Icon28Plus/>}
          onClick={handleNewWishlistPress}
        >
          Add wishlist
        </ButtonCell>
      </Section>
    </List>
  </Page>
};
