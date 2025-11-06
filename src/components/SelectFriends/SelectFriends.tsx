import {
  Cell,
  Avatar, Section, Button, Selectable
} from '@telegram-apps/telegram-ui';
import {FC, useState} from 'react';
import {ServiceFriend} from '@/backend-client';
import {usernameAndNameToAcronym} from "@/helpers/acronym.ts";
import {Loading} from "@/components/Loading.tsx";

// Use the ServiceFriendItem type from backend-client
export type Friend = ServiceFriend;

interface FriendsProps {
  friends: Friend[];
  selectedFriendsIds: number[];
  isLoading: boolean;
  saveFriendsList: (friendsIds: number[]) => void;
}

export const SelectFriends: FC<FriendsProps> = ({friends, selectedFriendsIds, isLoading, saveFriendsList}) => {
  const [friendsIds, setFriendsIds] = useState(selectedFriendsIds)

  const onFriendClick = (friendId: number) => {
    if (friendsIds.includes(friendId)) {
      setFriendsIds(friendsIds.filter((value) => value != friendId))
    } else {
      setFriendsIds([...friendsIds, friendId])
    }
  };

  if (isLoading) {
    return <Loading/>;
  }

  return <Section>
    {friends.map((friend) =>
      <Cell
        key={"friend_" + friend.id}
        subtitle={friend.name ? "@" + friend.username : undefined}
        before={<Avatar size={28} src={friend.photo_url}
                        acronym={usernameAndNameToAcronym(friend.name, friend.username!)}/>}
        after={<Selectable checked={friendsIds.includes(friend.id!)} onClick={() => {onFriendClick(friend.id!)}}/>}
        onClick={() => onFriendClick(friend.id!)}
      >
        {friend.name ? friend.name : "@" + friend.username}
      </Cell>
    )}
    <Button stretched onClick={() => saveFriendsList(friendsIds)}>
      Save
    </Button>
  </Section>
};
