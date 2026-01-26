import {
  Cell,
  Navigation,
  Avatar
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';
import {ServiceFriend} from '@/backend-client';
import {usernameAndNameToAcronym} from "@/helpers/acronym.ts";

// Use the ServiceFriendItem type from backend-client
export type Friend = ServiceFriend;

interface FriendsProps {
  friends: Friend[];
  onFriendClick: (friend: Friend) => void;
}

export const Friends: FC<FriendsProps> = ({friends, onFriendClick}) => {
  return friends.map((friend) =>
    <Cell
      key={"friend_" + friend.id}
      subtitle={friend.name ? "@" + friend.username : undefined}
      before={<Avatar size={28} src={friend.photo_url}
                      acronym={usernameAndNameToAcronym(friend.name, friend.username!)}/>}
      after={<Navigation/>}
      onClick={() => onFriendClick(friend)}
    >
      {friend.name ? friend.name : "@" + friend.username}
    </Cell>// TODO id when missing username
  )
};
