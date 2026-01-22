import {FC, memo, useCallback} from 'react';
import {useNavigate} from "react-router";

import {
  List,
  Section,
  ButtonCell,
} from '@telegram-apps/telegram-ui';

import {useBackendWishlists} from "@/hooks/useBackendWishlists.tsx";
import {Wishlists} from "@/components/Wishlists/Wishlists.tsx";
import {Page} from "@/components/Page.tsx";
import {Loading} from "@/components/Loading.tsx";
import {Icon28Plus} from "@/icons/28/Plus.tsx";
import {ServiceWishlist} from "@/backend-client";
import ReactPullToRefresh from "react-pull-to-refresh";

export const WishlistsPage: FC = memo(function WishlistsPage() {
  const navigate = useNavigate()

  const {wishlists, isLoading, refetch} = useBackendWishlists();

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
    <ReactPullToRefresh onRefresh={refetch}>
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
    </ReactPullToRefresh>
  </Page>
});
