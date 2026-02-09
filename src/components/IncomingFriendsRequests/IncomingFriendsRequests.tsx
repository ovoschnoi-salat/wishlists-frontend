import {
  Cell,
  Avatar, Button
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';
import {ServiceFriend} from '@/backend-client';
import {useTranslation} from "react-i18next";
import {getAcronymFromNameOrUsername} from "@/helpers/acronym.ts";
import {getFriendUsernameOrId} from "@/helpers/user.ts";

export type Friend = ServiceFriend;

interface IncomingFriendsRequestsProps {
  friends: Friend[];
  onAcceptClick: (friendId: number) => void;
  onDenyClick: (friendId: number) => void;
}

export const IncomingFriendsRequests: FC<IncomingFriendsRequestsProps> = ({friends, onAcceptClick, onDenyClick}) => {
  const {t} = useTranslation();
  return friends.map((friend) =>
    <Cell
      key={"friend_" + friend.id}
      subtitle={friend.name ? getFriendUsernameOrId(friend) : undefined}
      before={
        <Avatar
          size={28}
          src={friend.photo_url}
          acronym={getAcronymFromNameOrUsername(friend.name, friend.username)}
        />}
      after={<>
        <Button
          mode="plain"
          size="s"
          onClick={() => onDenyClick(friend.id!)}
        >
          {t('friend.deny')}
        </Button>
        <Button
          mode="plain"
          size="s"
          onClick={() => onAcceptClick(friend.id!)}
        >
          {t('friend.accept')}
        </Button>
      </>}
    >
      {friend.name ? friend.name : getFriendUsernameOrId(friend)}
    </Cell>
  )
};
