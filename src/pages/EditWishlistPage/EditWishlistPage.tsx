import {
  ButtonCell,
  List, Section,
} from '@telegram-apps/telegram-ui';
import {FC, useState} from 'react';

import {
  deleteApiUserWishlist,
  patchApiUserWishlist,
  ServiceCreateWishlistRequest,
  ServiceWishlist, SubcodeErrorsResponse
} from '@/backend-client';
import {Page} from "@/components/Page.tsx";
import {useLocation, useNavigate} from "react-router";
import {loadFriends} from "@/hooks/loadFriends.ts";
import {loadWishlistAccessList} from "@/hooks/loadWishlistAccessList.ts";
import {EditWishlist} from "@/components/EditWishlist/EditWishlist.tsx";
import {BackendErrorHandler} from "@/components/BackendErrorHandler/BackendErrorHandler.tsx";

const loadState = () => {
  let {state} = useLocation()
  return state as ServiceWishlist
}

export const EditWishlistPage: FC = () => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<SubcodeErrorsResponse | undefined>(undefined)
  const [saveError, setSaveError] = useState<SubcodeErrorsResponse | undefined>(undefined)

  const wishlist = loadState()

  const {friends, isLoading} = loadFriends();

  const WishlistAccessList = loadWishlistAccessList(wishlist.id!)

  const navigate = useNavigate()

  const handleDeleteWishlist = async () => {
    setIsDeleting(true)
    const {error} = await deleteApiUserWishlist({
      query: {wishlist_id: wishlist.id!}
    });

    setIsDeleting(false)
    if (error) {
      setDeleteError(error)
      return
    }

    navigate(`/`)
  };

  const handleSaveWishlist = async (newWishlist: ServiceCreateWishlistRequest) => {
    const {data, error} = await patchApiUserWishlist({
      body: newWishlist,
      query: {wishlist_id: wishlist.id!}
    });

    if (error) {
      setSaveError(error)
      return
    }

    navigate(`/wishlist/${wishlist.id!}/items`, {replace: true, state: data})
  };

  return <Page
    pageTitle={"Wishlist edit"}
    backNavFn={() => {
    navigate(`/wishlist/${wishlist.id!}/items`, {replace: true, state: wishlist})
  }}>
    <BackendErrorHandler error={deleteError} resetError={setDeleteError}/>
    <BackendErrorHandler error={saveError} resetError={setSaveError}/>
    <List>
      <EditWishlist
        wishlist={wishlist}
        friendsWithAccess={WishlistAccessList.accessList}
        onSave={handleSaveWishlist}
        friends={friends}
        isLoadingFriends={isLoading || WishlistAccessList.isLoading}
      />
      <Section>
        <ButtonCell
          disabled={isDeleting}
          mode={"destructive"}
          onClick={handleDeleteWishlist}
        >
          Delete Wishlist
        </ButtonCell>
      </Section>
    </List>
  </Page>
};
