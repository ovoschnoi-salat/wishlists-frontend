import {useState} from 'react';
import {
  Section,
  Cell,
  Button,
  Switch,
  Input,
  Textarea,
  Badge,
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';
import {Icon28Plus} from '@/icons/28/Plus.tsx';
import {SelectFriends} from "@/components/SelectFriends/SelectFriends.tsx";
import {Friend} from "@/components/Friends/Friends.tsx";
import {ServiceCreateWishlistRequest} from "@/backend-client";

interface NewWishlistProps {
  friends: Friend[];
  isLoadingFriends: boolean;
  onSave?: (wishlist: ServiceCreateWishlistRequest) => void;
}

export const NewWishlist: FC<NewWishlistProps> = ({friends, isLoadingFriends, onSave}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [usersWithAccess, setUsersWithAccess] = useState([] as number[]);
  const [isSaving, setIsSaving] = useState(false);
  const [showSelectFriends, setShowSelectFriends] = useState(false);

  const handleSave = () => {
    if (title.trim()) {
      setIsSaving(true)

      onSave?.({
        title: title.trim(),
        description: description.trim(),
        is_private: isPrivate,
        users_with_access: usersWithAccess,
      });
    }
  };

  const handleUsersWithAccessPress = () => {
    setShowSelectFriends(true)
  };

  const handleSaveUsersWithAccess = (friendsIds: number[]) => {
    setShowSelectFriends(false)
    setUsersWithAccess(friendsIds)
  };

  const handleSetIsPrivate = (isPrivate: boolean) => {
    setIsPrivate(isPrivate)
    if (!isPrivate) {
      setUsersWithAccess([])
    }
  }

  return (
    !showSelectFriends ?
      <>
        <Section
          header="Title"
        >
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Section>

        {/* Description Section */}
        <Section
          header="Description"
        >
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </Section>

        {/* Privacy Settings Section */}
        <Section
          header="Privacy settings"
        >
          {/* Private List Toggle */}
          <Cell
            after={
              <Switch
                checked={isPrivate}
                onChange={(event) => handleSetIsPrivate(event.target.checked)}
              />
            }
          >
            Private list
          </Cell>

          {/* Users with Access */}
          {isPrivate && <Cell
           after={<Badge type="number">{usersWithAccess.length}</Badge>}
           onClick={handleUsersWithAccessPress}
          >
            Users with access
          </Cell>}
        </Section>

        {/* Create List Button */}
        <Section>
          <Button
            mode="filled"
            size="m"
            stretched
            onClick={handleSave}
            disabled={!title.trim() || isSaving}
            loading={isSaving}
            before={<Icon28Plus/>}
          >
            Create list
          </Button>
        </Section>
      </> :
      <SelectFriends friends={friends} selectedFriendsIds={usersWithAccess} isLoading={isLoadingFriends} saveFriendsList={handleSaveUsersWithAccess}/>

  );
};
