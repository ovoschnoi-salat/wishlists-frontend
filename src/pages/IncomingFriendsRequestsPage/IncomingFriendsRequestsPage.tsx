import {
  List,
  Section,
} from '@telegram-apps/telegram-ui';
import {FC, memo, useState} from 'react';

import {Page} from "@/components/Page.tsx";
import {Loading} from "@/components/Loading.tsx";
import {IncomingFriendsRequests} from "@/components/IncomingFriendsRequests/IncomingFriendsRequests.tsx";
import {
  postApiUserFriendRequestAccept,
  postApiUserFriendRequestDeny,
  ServiceFriend,
  SubcodeErrorsResponse
} from "@/backend-client";
import {useBackendIncomingFriendsRequests} from "@/hooks/useBackendIncomingFriendsRequests.ts";
import {useNavigate} from "react-router";
import {BackendErrorHandler} from "@/components/BackendErrorHandler/BackendErrorHandler.tsx";

export const IncomingFriendsRequestsPage: FC = memo(function IncomingFriendsRequestsPage() {
  const navigate = useNavigate()
  const [acceptError, setAcceptError] = useState<SubcodeErrorsResponse | undefined>()
  const [rejectError, setRejectError] = useState<SubcodeErrorsResponse | undefined>()

  const {friends, setFriends, isLoading, error, resetError} = useBackendIncomingFriendsRequests()

  const handleAcceptPress = async (friendId: number) => {
    const {error} = await postApiUserFriendRequestAccept({query: {friend_id: friendId}})

    if (error) {
      setAcceptError(error)
      return
    }

    removeRequestFromList(friendId)
  };

  const handleDenyPress = async (friendId: number) => {
    const {error} = await postApiUserFriendRequestDeny({query: {friend_id: friendId}})

    if (error) {
      setRejectError(error)
      return
    }

    removeRequestFromList(friendId)
  };

  const removeRequestFromList = (id: number) => {
    const newList = friends.filter((value: ServiceFriend) => value.id != id)
    if (newList.length === 0) {
      navigate(-1);
    }
    setFriends(newList)
  }

  if (isLoading) {
    return <Loading/>;
  }

  return <Page pageTitle={"Incoming friends requests"} backNavFn={() => {navigate("../..", {replace: true, relative: "path"})}}>
    <BackendErrorHandler error={acceptError} resetError={setAcceptError}/>
    <BackendErrorHandler error={rejectError} resetError={setRejectError}/>
    <BackendErrorHandler error={error} resetError={resetError}/>
    <List>
      <Section header='Incoming friends requests'>
        <IncomingFriendsRequests friends={friends} onDenyClick={handleDenyPress} onAcceptClick={handleAcceptPress}/>
      </Section>
    </List>
  </Page>
});
