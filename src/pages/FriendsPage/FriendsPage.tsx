import {
  List,
  Section, ButtonCell, Cell, Badge,
} from '@telegram-apps/telegram-ui';
import {FC, memo, useCallback} from 'react';

import {useBackendFriends} from "@/hooks/useBackendFriends.tsx";
import {Friends} from "@/components/Friends/Friends.tsx";
import {Page} from "@/components/Page.tsx";
import {Loading} from "@/components/Loading.tsx";
import {Icon28Plus} from "@/icons/28/Plus.tsx";
import {useNavigate} from "react-router";
import {useBackendIncomingFriendsRequestsCount} from "@/hooks/useBackendIncomingFriendsRequestsCount.tsx";
import {ServiceFriend} from "@/backend-client";

export const FriendsPage: FC = memo(function FriendsPage() {
  const navigate = useNavigate();

  const {friends, isLoading} = useBackendFriends();

  const {requestsCount} = useBackendIncomingFriendsRequestsCount();

  const handleIncomingFriendsRequestsPress = useCallback(() => {
    navigate(`requests/incoming`);
  }, [navigate]);

  const handleAddFriend = useCallback(() => {
    console.log('nav to new')
    navigate(`new`);
  }, [navigate]);

  const handleFriendPress = (friend: ServiceFriend) => {
    navigate(`/friend`, {state: friend});
  };

  if (isLoading) {
    return <Loading/>;
  }

  return <Page pageTitle={"Friends"} back={false}>
    <List>
      <Section header='Friends requests'>
        {requestsCount !== 0 &&
         <Cell
          after={<Badge type="number">{requestsCount}</Badge>}
          onClick={handleIncomingFriendsRequestsPress}
         >
           Incoming friends requests
         </Cell>
        }

        <ButtonCell
          before={<Icon28Plus/>}
          onClick={handleAddFriend}
        >
          Add friend
        </ButtonCell>
      </Section>

      <Section header='My friends'>
        <Friends friends={friends} onFriendClick={handleFriendPress}/>
      </Section>
    </List>
  </Page>
});
