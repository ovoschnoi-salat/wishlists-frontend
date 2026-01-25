import {useLocation, useNavigate} from 'react-router';
import {FC, memo} from 'react';
import {Cell, List, Section, Title} from "@telegram-apps/telegram-ui";
import {Page} from "@/components/Page.tsx";
import {FriendWishlistItems} from "@/components/FriendWishlistItems";
import {ServiceWishlist, ServiceWishlistItem} from "@/backend-client";
import {useBackendFriendWishlistItems} from "@/hooks/useBackendFriendWishlistItems.tsx";

const useLocationState = () => {
  const {state} = useLocation()
  return state as ServiceWishlist
}

export const FriendWishlistPage: FC = memo(function FriendWishlistItemsPage() {
  const navigate = useNavigate()

  const wishlist = useLocationState()

  const handleItemPress = (item: ServiceWishlistItem) => {
    navigate(`item`, {state: item, relative: "path"})
  };

  const {items, isLoading} = useBackendFriendWishlistItems(wishlist.id!);

  return <Page pageTitle={wishlist.title}>
    <List>
      <Section header={"Friend wishlist"}>
        <Cell subhead="Title" subtitle={wishlist.is_private ? "private" : undefined}>
          <Title level="3">
            {wishlist.title}
          </Title>
        </Cell>

        {wishlist.description &&
         <Cell subhead="Description">
           {wishlist.description}
         </Cell>
        }
      </Section>

      <Section header={"Wishes"}>
        <FriendWishlistItems items={items} isLoading={isLoading} onItemClick={handleItemPress}/>
      </Section>
    </List>
  </Page>
});
