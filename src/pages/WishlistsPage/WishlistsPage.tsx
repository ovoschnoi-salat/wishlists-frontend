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
import {useTranslation} from "react-i18next";

export const WishlistsPage: FC = memo(function WishlistsPage() {
  const navigate = useNavigate()
  const {t} = useTranslation()

  const {wishlists, isLoading} = useBackendWishlists();

  const handleNewWishlistPress = useCallback(() => {
    navigate(`new`)
  }, [navigate]);

  const handleWishlistPress = useCallback((wishlist: ServiceWishlist) => {
    navigate(`/wishlist`, {state: wishlist});
  }, [navigate]);

  if (isLoading) {
    return <Loading/>;
  }

  return <Page back={false}>
    <List>
      <Section header={t("wishlists.wishlists")}>
        <Wishlists wishlists={wishlists} isLoading={isLoading} onWishlistClick={handleWishlistPress}/>

        <ButtonCell
          before={<Icon28Plus/>}
          onClick={handleNewWishlistPress}
        >
          {t("wishlists.addWishlist")}
        </ButtonCell>
      </Section>
    </List>
  </Page>
});
