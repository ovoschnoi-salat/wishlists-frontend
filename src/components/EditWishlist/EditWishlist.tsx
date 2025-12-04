import {ChangeEvent, memo, useCallback, useState} from 'react';
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
import {ServiceCreateWishlistRequest, ServiceWishlist} from "@/backend-client";

interface editWishlistProps {
  wishlist: ServiceWishlist;
  friendsWithAccess: number[];
  friends: Friend[];
  isLoadingFriends: boolean;
  onSave: (wishlist: ServiceCreateWishlistRequest) => Promise<void>;
}

export const EditWishlist: FC<editWishlistProps> = memo(function EditWishlist({
                                                                                wishlist,
                                                                                friendsWithAccess,
                                                                                friends,
                                                                                isLoadingFriends,
                                                                                onSave
                                                                              }) {
  const [title, setTitle] = useState(wishlist.title!);
  const [description, setDescription] = useState(wishlist.description!);
  const [isPrivate, setIsPrivate] = useState(wishlist.is_private!);
  const [usersWithAccess, setUsersWithAccess] = useState(friendsWithAccess);
  const [isSaving, setIsSaving] = useState(false);
  const [showSelectFriends, setShowSelectFriends] = useState(false);

  const handlePressIsPrivate = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setIsPrivate(e.target.checked)
  }, []);

  const handleSave = useCallback(async () => {
    if (title.trim()) {
      setIsSaving(true)
      try {
        await onSave({
          title: title.trim(),
          description: description.trim(),
          is_private: isPrivate,
          users_with_access: isPrivate ? usersWithAccess : [],
        });
      } finally {
        setIsSaving(false)
      }
    }
  }, [description, isPrivate, onSave, title, usersWithAccess]);

  const handleUsersWithAccessPress = useCallback(() => {
    setShowSelectFriends(true)
  }, []);

  const handleSaveUsersWithAccess = useCallback((friendsIds: number[]) => {
    setShowSelectFriends(false)
    setUsersWithAccess(friendsIds)
  }, []);

  return (
    <>
      {!showSelectFriends ?
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
                  onChange={handlePressIsPrivate}
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
              Save wishlist
            </Button>
          </Section>
        </> :
        <SelectFriends
          friends={friends}
          selectedFriendsIds={usersWithAccess}
          isLoading={isLoadingFriends}
          saveFriendsList={handleSaveUsersWithAccess}
        />
      }
    </>
  );
});
