import {
  List,
} from '@telegram-apps/telegram-ui';
import {FC, useState} from 'react';
import {useNavigate} from "react-router";

import {postApiUserFriendRequest} from '@/backend-client';
import {Page} from "@/components/Page.tsx";
import {NewFriend} from "@/components/NewFriend/NewFriend.tsx";
import {ErrorSnackbarProps} from "@/components/ErrorSnackbar/ErrorSnackbar.tsx";

export const NewFriendPage: FC = () => {
  const [errorSnackbarProps, setErrorSnackbarProps] = useState<ErrorSnackbarProps | undefined>(undefined)

  const navigate = useNavigate()

  const handleSendFriendRequest = async (username: string) => {
    const {error} = await postApiUserFriendRequest({
      query: {username: username}
    });

    if (error) {
      setErrorSnackbarProps({
        title: "error sending friends request",
        error: error,
        onClose: () => {
          setErrorSnackbarProps(undefined)
        }
      })
      return
    }

    navigate(`/friends`)
  };


  return <Page>
    <List>
      <NewFriend onSend={handleSendFriendRequest}/>
    </List>
  </Page>
};
