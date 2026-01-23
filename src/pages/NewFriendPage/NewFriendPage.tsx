import {FC, memo, useCallback} from 'react';
import {useNavigate} from "react-router";

import {List} from '@telegram-apps/telegram-ui';

import {postApiUserFriendRequest} from '@/backend-client';
import {Page} from "@/components/Page.tsx";
import {NewFriend} from "@/components/NewFriend/NewFriend.tsx";
import {toast} from "react-hot-toast"
import {ToastBackendError} from "@/components/ToastBackendError/ToastBackendError.tsx";

export const NewFriendPage: FC = memo(function NewFriendPage() {
  const navigate = useNavigate()

  const handleSendFriendRequest = useCallback(async (username: string) => {
    const toastId = toast.loading("Sending request...")

    const {error} = await postApiUserFriendRequest({
      query: {username: username}
    });

    if (error) {
      toast.error(<ToastBackendError error={error}/>, {id: toastId})
      return
    }

    toast.success("Request sent successfully", {id: toastId})

    navigate(-1)
  }, [navigate]);

  return <Page>
    <List>
      <NewFriend onSend={handleSendFriendRequest}/>
    </List>
  </Page>
});
