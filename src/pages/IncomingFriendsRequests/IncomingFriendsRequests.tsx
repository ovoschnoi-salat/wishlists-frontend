import {
  List,
  Section, ButtonCell,
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';

import {loadFriends} from "@/hooks/loadFriends.ts";
import {Friends} from "@/components/Friends/Friends.tsx";
import {Page} from "@/components/Page.tsx";
import {Loading} from "@/components/Loading.tsx";
import {Icon28Plus} from "@/icons/28/Plus.tsx";
import {useNavigate} from "react-router-dom";

export const IncomingFriendsRequests: FC = () => {
  const {friends, isLoading} = loadFriends();
  const navigate = useNavigate()

  const handleAddFriend = () => {
    navigate(`/friend/new`);
  }


  const handleFriendPress = (friendId: number) => {
    navigate(`/friend/${friendId}/wishlists`);
  };

  if (isLoading) {
    return <Loading/>;
  }

  return <Page back={false}>
    <List>
      <Section header='My friends'>
        <Friends friends={friends} onFriendClick={handleFriendPress}/>

        <ButtonCell
          before={<Icon28Plus/>}
          onClick={handleAddFriend}
        >
          Add friend
        </ButtonCell>
      </Section>
    </List>
  </Page>
};
