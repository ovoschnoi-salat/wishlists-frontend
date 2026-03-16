import {useLocation, useNavigate} from 'react-router';
import {FC, memo, useCallback} from 'react';
import {List} from "@telegram-apps/telegram-ui";
import {Page} from "@/components/Page.tsx";
import {EditWishlistItem} from "@/components/EditWishlistItem/EditWishlistItem.tsx";
import {
  deleteApiUserWish,
  patchApiUserWishlistItem,
  ServiceCreateWishlistItemRequest, ServiceWishlistItem
} from "@/backend-client";
import {toast} from "react-hot-toast";
import {ToastBackendError} from "@/components/ToastBackendError/ToastBackendError.tsx";
import {useTranslation} from "react-i18next";
import {showDestructivePopup} from "@/pages/helpers/popup.ts";

const useLocationState = () => {
  const {state} = useLocation()
  return state as ServiceWishlistItem | undefined
}

export const EditWishPage: FC = memo(function EditWishlistItemPage() {
  const navigate = useNavigate();
  const {t} = useTranslation();

  const item = useLocationState()

  if (!item) {
    throw t('invalidState')
  }

  const handleSaveWish = useCallback(async (newItem: ServiceCreateWishlistItemRequest) => {
    const toastId = toast.loading(t('wish.toast.editing'))

    newItem.wishlist_id = item.wishlist_id

    const {data, error} = await patchApiUserWishlistItem({
      body: newItem,
      query: {
        item_id: item.id!,
      }
    })

    if (error) {
      toast.error(<ToastBackendError error={error}/>, {id: toastId})
      return
    }

    toast.success(t('wish.toast.edited'), {id: toastId})

    navigate(`..`, {replace: true, relative: "path", state: data})
  }, [item.id, item.wishlist_id, navigate, t]);

  const handleDeleteWish = useCallback(async () => {
    if (!await showDestructivePopup(
      t('wish.remove'),
      t('wish.removeQuestion'),
      t('yes'),
      t('no'))) {
      return
    }

    const toastId = toast.loading(t('wish.toast.removing'))

    const {error} = await deleteApiUserWish({
      query: {
        wish_id: item.id!,
      }
    })

    if (error) {
      toast.error(<ToastBackendError error={error}/>, {id: toastId})
      return
    }

    toast.success(t('wish.toast.removed'), {id: toastId})

    navigate(-1)
  }, [item.id, navigate, t])

  return <Page
    backNavFn={() => {
      navigate(`..`, {replace: true, relative: "path", state: item})
    }}>
    <List>
      <EditWishlistItem
        onSave={handleSaveWish} onDelete={handleDeleteWish} wishlist={item}/>
    </List>
  </Page>
});
