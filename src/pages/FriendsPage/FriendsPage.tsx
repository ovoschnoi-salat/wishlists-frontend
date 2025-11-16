import {
  List,
  Section, ButtonCell, Cell, Badge,
} from '@telegram-apps/telegram-ui';
import {FC} from 'react';

import {loadFriends} from "@/hooks/loadFriends.ts";
import {Friends} from "@/components/Friends/Friends.tsx";
import {Page} from "@/components/Page.tsx";
import {Loading} from "@/components/Loading.tsx";
import {Icon28Plus} from "@/icons/28/Plus.tsx";
import {useNavigate} from "react-router";
import {loadIncomingFriendsRequestsCount} from "@/hooks/loadIncomingFriendsRequestsCount.ts";
import {BackendErrorHandler} from "@/components/BackendErrorHandler/BackendErrorHandler.tsx";

export const FriendsPage: FC = () => {
  const navigate = useNavigate();

  const {friends, isLoading, error, resetError} = loadFriends();

  const {requestsCount, error: requestsError, resetError: resetRequestsError} = loadIncomingFriendsRequestsCount();

  const handleIncomingFriendsRequestsPress = () => {
    navigate(`requests/incoming`);
  };

  const handleAddFriend = () => {
    navigate(`/friend/new`);
  };

  const handleFriendPress = (friendId: number) => {
    navigate(`/friend/${friendId}/wishlists`);
  };

  if (isLoading) {
    return <Loading/>;
  };

  return <Page pageTitle={"Friends"} back={false}>
    <BackendErrorHandler error={error} resetError={resetError}/>
    <BackendErrorHandler error={requestsError} resetError={resetRequestsError}/>
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

        <ButtonCell before={<Icon28Plus/>} onClick={handleAddFriend}>
          Add friend
        </ButtonCell>
      </Section>

      <Section header='My friends'>
        <Friends friends={friends} onFriendClick={handleFriendPress}/>
      </Section>
    </List>
  </Page>
};
