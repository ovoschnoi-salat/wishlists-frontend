import {FC, memo, useCallback} from 'react';
import {useNavigate} from "react-router";

import {
  List,
  Section,
  ButtonCell,
} from '@telegram-apps/telegram-ui';

import {useBackendWishlists} from "@/hooks/useBackendWishlists.ts";
import {Wishlists} from "@/components/Wishlists/Wishlists.tsx";
import {Page} from "@/components/Page.tsx";
import {Loading} from "@/components/Loading.tsx";
import {Icon28Plus} from "@/icons/28/Plus.tsx";
import {ServiceWishlist} from "@/backend-client";
import {BackendErrorHandler} from "@/components/BackendErrorHandler/BackendErrorHandler.tsx";

export const WishlistsPage: FC = memo(function WishlistsPage() {
  const navigate = useNavigate()

  const {wishlists, isLoading, error, resetError} = useBackendWishlists();

  const handleNewWishlistPress = useCallback(() => {
    navigate(`/wishlists/new`)
  }, [navigate]);

  const handleWishlistPress = useCallback((wishlist: ServiceWishlist) => {
    navigate(`/wishlists/${wishlist.id}/items`, {state: wishlist});
  }, [navigate]);

  if (isLoading) {
    return <Loading/>;
  }

  return <Page pageTitle={"Your wishlists"} back={false}>
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
});
