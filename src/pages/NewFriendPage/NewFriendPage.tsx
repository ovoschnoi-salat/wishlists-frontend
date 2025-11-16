import {
  List,
} from '@telegram-apps/telegram-ui';
import {FC, useState} from 'react';
import {useNavigate} from "react-router";

import {postApiUserFriendRequest, SubcodeErrorsResponse} from '@/backend-client';
import {Page} from "@/components/Page.tsx";
import {NewFriend} from "@/components/NewFriend/NewFriend.tsx";
import {BackendErrorHandler} from "@/components/BackendErrorHandler/BackendErrorHandler.tsx";

export const NewFriendPage: FC = () => {
  const navigate = useNavigate()
  const [sendError, setSendError] = useState<SubcodeErrorsResponse | undefined>()

  const handleSendFriendRequest = async (username: string) => {
    const {error} = await postApiUserFriendRequest({
      query: {username: username}
    });

    if (error) {
      setSendError(error)
      return
    }

    navigate(-1)
  };

  return <Page>
     <BackendErrorHandler error={sendError} resetError={setSendError}/>
    <List>
      <NewFriend onSend={handleSendFriendRequest}/>
    </List>
  </Page>
};
