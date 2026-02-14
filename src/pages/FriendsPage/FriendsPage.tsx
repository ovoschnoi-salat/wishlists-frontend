import {
  List,
  Section, ButtonCell, Cell, Badge,
} from '@telegram-apps/telegram-ui';
import {FC, memo, ReactNode, useCallback} from 'react';

import {useBackendFriends} from "@/hooks/useBackendFriends.tsx";
import {Friends} from "@/components/Friends/Friends.tsx";
import {Page} from "@/components/Page.tsx";
import {Loading} from "@/components/Loading.tsx";
import {Icon28Plus} from "@/icons/28/Plus.tsx";
import {useNavigate} from "react-router";
import {useBackendIncomingFriendsRequestsCount} from "@/hooks/useBackendIncomingFriendsRequestsCount.tsx";
import {ServiceFriend} from "@/backend-client";
import {useTranslation} from "react-i18next";

export const FriendsPage: FC = memo(function FriendsPage() {
  const navigate = useNavigate();
  const {t} = useTranslation();

  const {friends, isLoading} = useBackendFriends();

  const {requestsCount} = useBackendIncomingFriendsRequestsCount();

  const handleIncomingFriendsRequestsPress = useCallback(() => {
    navigate(`requests/incoming`);
  }, [navigate]);

  const handleAddFriend = useCallback(() => {
    navigate(`new`);
  }, [navigate]);

  const handleFriendPress = (friend: ServiceFriend) => {
    navigate(`/friend`, {state: friend});
  };

  if (isLoading) {
    return <Loading/>;
  }

  const requestsCells: ReactNode[] = []

  if (requestsCount !== 0) {
    requestsCells.push([
      <Cell
        key="incoming"
        after={<Badge type="number">{requestsCount}</Badge>}
        onClick={handleIncomingFriendsRequestsPress}
      >
        {t('friends.incomingRequests')}
      </Cell>
    ])
  }

  requestsCells.push([
    <ButtonCell
      key="createRequest"
      before={<Icon28Plus/>}
      onClick={handleAddFriend}
    >
      {t('friends.add')}
    </ButtonCell>
  ])

  return <Page back={false}>
    <List>
      <Section header={t('friends.requests')}>
        {...requestsCells}
      </Section>

      <Section header={t('friends.myFriends')}>
        <Friends friends={friends} onFriendClick={handleFriendPress}/>
      </Section>
    </List>
  </Page>
});
