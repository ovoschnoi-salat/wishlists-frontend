import {
  Cell,
  Avatar, Button
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';
import {ServiceFriend} from '@/backend-client';

export type Friend = ServiceFriend;

interface IncomingFriendsRequestsProps {
  friends: Friend[];
  onAcceptClick: (friendId: number) => void;
  onDenyClick: (friendId: number) => void;
}

export const IncomingFriendsRequests: FC<IncomingFriendsRequestsProps> = ({friends, onAcceptClick, onDenyClick}) => {
  return friends.map((friend) =>
    <Cell
      key={"friend_" + friend.id}
      subtitle={friend.name ? "@" + friend.username : undefined}
      before={friend.photo_url ? <Avatar size={28} src={friend.photo_url} acronym={"B"}/> : undefined}
      after={ <>
        <Button
          mode="plain"
          size={"s"}
          onClick={() => onDenyClick(friend.id!)}
        >
          Deny
        </Button>
        <Button
          mode="plain"
          size={"s"}
          onClick={() => onAcceptClick(friend.id!)}
        >
          Accept
        </Button>
      </>}
    >
      {friend.name ? friend.name : friend.username}
    </Cell>
  )
};
