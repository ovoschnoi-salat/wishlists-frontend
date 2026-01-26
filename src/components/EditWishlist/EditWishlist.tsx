import {ChangeEvent, memo, ReactNode, useCallback, useState} from 'react';
import {
  Section,
  Cell,
  Switch,
  Input,
  Textarea,
  Badge, ButtonCell,
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';
import {SelectFriends} from "@/components/SelectFriends/SelectFriends.tsx";
import {Friend} from "@/components/Friends/Friends.tsx";
import {ServiceCreateWishlistRequest, ServiceWishlist} from "@/backend-client";
import {Icon28Cancel} from "@/icons/28/Cancel.tsx";
import {StretchedButton} from "@/components/StretchedButton/StretchedButton.tsx";
import {useTranslation} from "react-i18next";

interface editWishlistProps {
  wishlist: ServiceWishlist;
  friendsWithAccess: number[];
  friends: Friend[];
  onSave: (wishlist: ServiceCreateWishlistRequest) => Promise<void>;
  onDelete?: () => Promise<void>;
}

export const EditWishlist: FC<editWishlistProps> = memo(function EditWishlist({
                                                                                wishlist,
                                                                                friendsWithAccess,
                                                                                friends,
                                                                                onSave,
                                                                                onDelete
                                                                              }) {
  const {t} = useTranslation();
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

  if (showSelectFriends) {
    return <SelectFriends
      friends={friends}
      selectedFriendsIds={usersWithAccess}
      saveFriendsList={handleSaveUsersWithAccess}
    />
  }

  const privacyCells: ReactNode[] = [
    <Cell
      key="privacySwitch"
      after={
        <Switch
          disabled={isDeleting || isSaving}
          checked={isPrivate}
          onChange={handlePressIsPrivate}
        />
      }
    >
      {t('wishlist.privateList')}
    </Cell>
  ]

  if (isPrivate) {
    privacyCells.push([
      <Cell
        key="accessList"
        disabled={isDeleting || isSaving}
        after={<Badge type="number">{usersWithAccess.length}</Badge>}
        onClick={handleUsersWithAccessPress}
      >
        {t('wishlist.accessList')}
      </Cell>
    ])
  }

  return (
    <>
      <Section
        header={t('wishlist.title')}
      >
        <Input
          disabled={isDeleting || isSaving}
          placeholder={t('wishlist.title')}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Section>

      {/* Description Section */}
      <Section
        header={t('wishlist.description')}
      >
        <Textarea
          disabled={isDeleting || isSaving}
          placeholder={t('wishlist.description')}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </Section>

      {/* Privacy Settings Section */}
      <Section
        header={t('wishlist.privacySettings')}
      >
        {...privacyCells}
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
        >
          {t('wishlist.save')}
        </StretchedButton>
      </Section>

      {onDelete && <Section>
        <ButtonCell
         disabled={isDeleting || isSaving}
         mode="destructive"
         before={<Icon28Cancel/>}
         onClick={handleDelete}
        >
          {t('wishlist.remove')}
        </ButtonCell>
      </Section>}
    </>
  );
});
