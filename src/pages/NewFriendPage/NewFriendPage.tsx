import {
  List,
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';

import {postApiUserFriendRequest} from '@/backend-client';
import {Page} from "@/components/Page.tsx";
// import {useNavigate} from "react-router";
import {NewFriend} from "@/components/NewFriend/NewFriend.tsx";

export const NewFriendPage: FC = () => {
  // const navigate = useNavigate()

  const handleSendFriendRequest = async (username: string) => {
    const {error} = await postApiUserFriendRequest({
      query: {username: username}
    });

    if (error) {
      throw error
    }

    // TODO
    // navigate(`/wishlist/${data?.id!}/items`)
  };


  return <Page>
    <List>
      <NewFriend onSend={handleSendFriendRequest}/>
    </List>
  </Page>
};
