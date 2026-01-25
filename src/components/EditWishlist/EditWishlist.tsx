import {ChangeEvent, memo, useCallback, useState} from 'react';
import {
  Section,
  Cell,
  Switch,
  Input,
  Textarea,
  Badge, ButtonCell,
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';
import {Icon28Plus} from '@/icons/28/Plus.tsx';
import {SelectFriends} from "@/components/SelectFriends/SelectFriends.tsx";
import {Friend} from "@/components/Friends/Friends.tsx";
import {ServiceCreateWishlistRequest, ServiceWishlist} from "@/backend-client";
import {Icon28Cancel} from "@/icons/28/Cancel.tsx";
import {StretchedButton} from "@/components/StretchedButton/StretchedButton.tsx";

interface editWishlistProps {
  wishlist: ServiceWishlist;
  friendsWithAccess: number[];
  friends: Friend[];
  isLoadingFriends: boolean;
  onSave: (wishlist: ServiceCreateWishlistRequest) => Promise<void>;
  onDelete?: () => Promise<void>;
}

export const EditWishlist: FC<editWishlistProps> = memo(function EditWishlist({
                                                                                wishlist,
                                                                                friendsWithAccess,
                                                                                friends,
                                                                                isLoadingFriends,
                                                                                onSave,
                                                                                onDelete
                                                                              }) {
  const [title, setTitle] = useState(wishlist.title!);
  const [description, setDescription] = useState(wishlist.description!);
  const [isPrivate, setIsPrivate] = useState(wishlist.is_private!);
  const [usersWithAccess, setUsersWithAccess] = useState(friendsWithAccess);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false)
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

  const handleDelete = useCallback(async () => {
    if (!onDelete) {
      return
    }
    setIsDeleting(true)
    try {
      await onDelete()
    } finally {
      setIsDeleting(false)
    }
  }, [onDelete, setIsDeleting])

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
              disabled={isDeleting || isSaving}
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
              disabled={isDeleting || isSaving}
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
            {isPrivate ? <>
              {/* Private List Toggle */}
              <Cell
                after={
                  <Switch
                    disabled={isDeleting || isSaving}
                    checked={isPrivate}
                    onChange={handlePressIsPrivate}
                  />
                }
              >
                Private list
              </Cell>

              {/* Users with Access */}
              <Cell
                disabled={isDeleting || isSaving}
                after={<Badge type="number">{usersWithAccess.length}</Badge>}
                onClick={handleUsersWithAccessPress}
              >
                Users with access
              </Cell>
            </> : <>
              {/* Private List Toggle */}
              <Cell
                after={
                  <Switch
                    disabled={isDeleting || isSaving}
                    checked={isPrivate}
                    onChange={handlePressIsPrivate}
                  />
                }
              >
                Private list
              </Cell>
            </>}
          </Section>

          {/* Create List Button */}
          <Section>
            <StretchedButton
              mode="filled"
              size="m"
              stretched
              onClick={handleSave}
              disabled={!title.trim() || isSaving || isDeleting}
              loading={isSaving}
              before={<Icon28Plus/>}
            >
              Save wishlist
            </StretchedButton>
          </Section>

          {onDelete && <Section>
            <ButtonCell
             disabled={isDeleting || isSaving}
             mode="destructive"
             before={<Icon28Cancel/>}
             onClick={handleDelete}
            >
              Delete Wishlist
            </ButtonCell>
          </Section>}
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
