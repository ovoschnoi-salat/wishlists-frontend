import {WishlistItem} from '@/components/WishlistItem';
import {useParams} from 'react-router';
import {FC} from 'react';
import {loadWishlistItem} from "@/hooks/loadWishlistItem.ts";
import {Page} from "@/components/Page.tsx";
import {List} from "@telegram-apps/telegram-ui";
// import {ErrorSnackbarProps} from "@/components/ErrorSnackbar/ErrorSnackbar.tsx";

export const FriendWishlistItemPage: FC = () => {
  // const [errorSnackbarProps, setErrorSnackbarProps] = useState<ErrorSnackbarProps | undefined>(undefined)

  const {itemId} = useParams<{ itemId: string }>();

  if (!itemId) {
    return <div>Item ID not found</div>;
  }

  const itemIdNumber = parseInt(itemId, 10);

  if (isNaN(itemIdNumber)) {
    return <div>Invalid item ID</div>;
  }

  const {item, isLoading} = loadWishlistItem(itemIdNumber);

  return <Page>
    <List>
      <WishlistItem item={item} isLoading={isLoading}/>
    </List>
  </Page>
};
