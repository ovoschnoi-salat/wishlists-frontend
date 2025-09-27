import {
  Cell, Section, Navigation, Avatar
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';
import {ServiceFriend} from '@/backend-client';

// Use the ServiceFriendItem type from backend-client
export type Friend = ServiceFriend;

interface FriendsProps {
  friends: Friend[];
  onFriendClick: (friendId: number) => void;
}

export const Friends: FC<FriendsProps> = ({friends, onFriendClick}) => {
  return <Section
    header='My Lists'
  >
    {friends && friends.map((friend) =>
      <Cell
        key={friend.id}
        before={friend.photo_url ? <Avatar size={28} src={friend.photo_url} acronym={"B"}/> : undefined}
        // before={friend.photo_url ? <Image size={28} src={friend.photo_url} fallbackIcon={}/> : undefined}
        after={<Navigation/>}
        onClick={() => onFriendClick(friend.id!)}
      >
        {friend.name || friend.username}
      </Cell>
    )}
  </Section>;
};
