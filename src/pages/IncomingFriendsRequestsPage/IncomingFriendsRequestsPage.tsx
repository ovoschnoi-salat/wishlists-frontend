import {
  List,
  Section,
} from '@telegram-apps/telegram-ui';
import {FC, memo} from 'react';

import {Page} from "@/components/Page.tsx";
import {Loading} from "@/components/Loading.tsx";
import {IncomingFriendsRequests} from "@/components/IncomingFriendsRequests/IncomingFriendsRequests.tsx";
import {
  postApiUserFriendRequestAccept,
  postApiUserFriendRequestDeny,
  ServiceFriend,
} from "@/backend-client";
import {useBackendIncomingFriendsRequests} from "@/hooks/useBackendIncomingFriendsRequests.tsx";
import {useNavigate} from "react-router";
import {toast} from "react-hot-toast";
import {ToastBackendError} from "@/components/ToastBackendError/ToastBackendError.tsx";

export const IncomingFriendsRequestsPage: FC = memo(function IncomingFriendsRequestsPage() {
  const navigate = useNavigate()

  const {friends, setFriends, isLoading} = useBackendIncomingFriendsRequests()

  const handleAcceptPress = async (friendId: number) => {
    const toastId = toast.loading("Accepting request...")

    const {error} = await postApiUserFriendRequestAccept({query: {friend_id: friendId}})

    if (error) {
      toast.error(<ToastBackendError error={error}/>, {id: toastId})
      return
    }

    toast.success("Request accepted successfully", {id: toastId})

    removeRequestFromList(friendId)
  };

  const handleDenyPress = async (friendId: number) => {
    const toastId = toast.loading("Denying request...")

    const {error} = await postApiUserFriendRequestDeny({query: {friend_id: friendId}})

    if (error) {
      toast.error(<ToastBackendError error={error}/>, {id: toastId})
      return
    }

    toast.success("Request denied successfully", {id: toastId})

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

  return <Page pageTitle="Incoming friends requests">
    <List>
      <Section header='Incoming friends requests'>
        <IncomingFriendsRequests friends={friends} onDenyClick={handleDenyPress} onAcceptClick={handleAcceptPress}/>
      </Section>
    </List>
  </Page>
});
