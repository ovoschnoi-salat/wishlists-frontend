import {FC, memo, useCallback, useState} from 'react';
import {useNavigate} from "react-router";

import {List} from '@telegram-apps/telegram-ui';

import {postApiUserFriendRequest, SubcodeErrorsResponse} from '@/backend-client';
import {Page} from "@/components/Page.tsx";
import {NewFriend} from "@/components/NewFriend/NewFriend.tsx";
import {BackendErrorHandler} from "@/components/BackendErrorHandler/BackendErrorHandler.tsx";

export const NewFriendPage: FC = memo(function NewFriendPage() {
  const navigate = useNavigate()
  const [sendError, setSendError] = useState<SubcodeErrorsResponse | undefined>()

  const handleSendFriendRequest = useCallback(async (username: string) => {
    const {error} = await postApiUserFriendRequest({
      query: {username: username}
    });

    if (error) {
      setSendError(error)
      return
    }

    navigate(-1)
  }, [navigate]);

  return <Page>
    <BackendErrorHandler error={sendError} resetError={setSendError}/>
    <List>
      <NewFriend onSend={handleSendFriendRequest}/>
    </List>
  </Page>
});
