import {
  List,
  Section,
} from '@telegram-apps/telegram-ui';
import {FC} from 'react';

import {Page} from "@/components/Page.tsx";
import {Loading} from "@/components/Loading.tsx";
import {IncomingFriendsRequests} from "@/components/IncomingFriendsRequests/IncomingFriendsRequests.tsx";
import {postApiUserFriendRequestAccept, postApiUserFriendRequestDeny, ServiceFriend} from "@/backend-client";
import {loadIncomingFriendsRequests} from "@/hooks/loadIncomingFriendsRequests.ts";
import {useNavigate} from "react-router-dom";

export const IncomingFriendsRequestsPage: FC = () => {
  const navigate = useNavigate()

  const {friends, setFriends, isLoading} = loadIncomingFriendsRequests()

  const handleAcceptPress = async (friendId: number) => {
    const {error} = await postApiUserFriendRequestAccept({query: {friend_id: friendId}})
    if (error) {
      throw error
    }
    await removeRequestFromList(friendId)
  };

  const handleDenyPress = async (friendId: number) => {
    const {error} = await postApiUserFriendRequestDeny({query: {friend_id: friendId}})
    if (error) {
      throw error
    }
    await removeRequestFromList(friendId)
  };

  const removeRequestFromList = async (id: number) => {
    const newList = friends.filter((value: ServiceFriend) => value.id != id)
    if (newList.length === 0) {
      navigate(`/friends`);
    }
    setFriends(newList)
  }

  if (isLoading) {
    return <Loading/>;
  }

  return <Page>
    <List>
      <Section header='Incoming friends requests'>
        <IncomingFriendsRequests friends={friends} onDenyClick={handleDenyPress} onAcceptClick={handleAcceptPress}/>
      </Section>
    </List>
  </Page>
};
