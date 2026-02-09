import {
  Cell,
  Avatar, Section, Multiselectable
} from '@telegram-apps/telegram-ui';
import {FC, memo, useState} from 'react';
import {ServiceFriend} from '@/backend-client';
import {getAcronymFromNameOrUsername} from "@/helpers/acronym.ts";
import {StretchedButton} from "@/components/StretchedButton/StretchedButton.tsx";
import {useTranslation} from "react-i18next";
import {getFriendUsernameOrId} from "@/helpers/user.ts";

export type Friend = ServiceFriend;

interface FriendsProps {
  friends: Friend[];
  selectedFriendsIds: number[];
  saveFriendsList: (friendsIds: number[]) => void;
}

export const SelectFriends: FC<FriendsProps> = memo(function SelectFriends({
                                                                             friends,
                                                                             selectedFriendsIds,
                                                                             saveFriendsList
                                                                           }) {
  const {t} = useTranslation();
  const [friendsIds, setFriendsIds] = useState(selectedFriendsIds)

  const onFriendClick = (friendId: number) => {
    if (friendsIds.includes(friendId)) {
      setFriendsIds(friendsIds.filter((value) => value != friendId))
    } else {
      setFriendsIds([...friendsIds, friendId])
    }
  };

  return <>
    <Section>
      {friends.map((friend) =>
        <Cell
          key={"friend_" + friend.id}
          subtitle={friend.name ? getFriendUsernameOrId(friend) : undefined}
          before={
            <Avatar
              size={28}
              src={friend.photo_url}
              acronym={getAcronymFromNameOrUsername(friend.name, friend.username)}
            />
          }
          after={
            <Multiselectable
              checked={friendsIds.includes(friend.id!)}
              readOnly={true}
              onInput={() => onFriendClick(friend.id!)}
            />
          }
          onClick={() => onFriendClick(friend.id!)}
        >
          {friend.name ? friend.name : getFriendUsernameOrId(friend)}
        </Cell>
      )}
    </Section>
    <Section>
      <StretchedButton stretched onClick={() => saveFriendsList(friendsIds)}>
        {t('save')}
      </StretchedButton>
    </Section>
  </>
});
