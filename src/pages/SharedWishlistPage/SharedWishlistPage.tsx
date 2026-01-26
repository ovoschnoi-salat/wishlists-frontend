import {Navigate} from 'react-router';
import {FC, memo} from 'react';
import {useBackendSharedWishlist} from "@/hooks/useBackendSharedWishlist.tsx";
import {useLaunchParams} from "@tma.js/sdk-react";
import {Loading} from "@/components/Loading.tsx";
import {useTranslation} from "react-i18next";

export const SharedWishlistPage: FC = memo(function WishlistItemsPage() {
  const lp = useLaunchParams();
  const {t} = useTranslation();

  const startParam = lp.tgWebAppStartParam;

  if (!startParam) {
    throw t('invalidStartParam')
  }

  const parts = startParam.split("_")
  if (parts.length !== 2 || parts[0] !== "wishlist") {
    throw t('invalidStartParam')
  }

  const {wishlist, isLoading} = useBackendSharedWishlist(parts[1])

  if (isLoading) {
    return <Loading/>
  }

  if (!wishlist) {
    return <Navigate to="/wishlists" replace={true}/>
  }

  return <Navigate to={`/friend/wishlist`} replace={true} state={wishlist}/>
});
