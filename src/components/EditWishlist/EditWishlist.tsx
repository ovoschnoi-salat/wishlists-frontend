import {ChangeEvent, memo, ReactNode, useCallback, useState} from 'react';
import {
  Section,
  Cell,
  Switch,
  Input,
  Textarea,
  Badge, ButtonCell, Select,
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';
import {SelectFriends} from "@/components/SelectFriends/SelectFriends.tsx";
import {Friend} from "@/components/Friends/Friends.tsx";
import {ServiceCreateWishlistRequest, ServiceSplitRequestPrivacy, ServiceWishlist} from "@/backend-client";
import {Icon28Cancel} from "@/icons/28/Cancel.tsx";
import {StretchedButton} from "@/components/StretchedButton/StretchedButton.tsx";
import {useTranslation} from "react-i18next";
import type {DefaultNamespace, ParseKeys, TOptions} from "i18next";

interface editWishlistProps {
  wishlist: ServiceWishlist;
  friendsWithAccess: number[];
  friends: Friend[];
  onSave: (wishlist: ServiceCreateWishlistRequest) => Promise<void>;
  onDelete?: () => Promise<void>;
}

interface ServiceSplitRequestPrivacyOption {
  key: ServiceSplitRequestPrivacy;
  translationKey: ParseKeys<DefaultNamespace, TOptions, undefined>;
}

const splitRequestsVisibilityOptions: ServiceSplitRequestPrivacyOption[] = [
  {
    key: "invisible_to_owner",
    translationKey: "wishlist.splitRequestsInvisibleToOwner"
  },
  {
    key: "visible_to_owner",
    translationKey: "wishlist.splitRequestsVisibleToOwner"
  }
]

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
  const [splitRequestsVisibility, setSplitRequestsVisibility] = useState<ServiceSplitRequestPrivacy | undefined>(wishlist.split_request_privacy );
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
          split_request_privacy: splitRequestsVisibility,
        });
      } finally {
        setIsSaving(false)
      }
    }
  }, [description, isPrivate, onSave, splitRequestsVisibility, title, usersWithAccess]);

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

  const handleSaveSplitRequestsVisibility = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setSplitRequestsVisibility(e.target.value as ServiceSplitRequestPrivacy)
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

      {/* Reservations Privacy Settings Section */}
      <Section
        header={t('wishlist.privacySettings')}
      >
        {...privacyCells}
      </Section>

      {/* Split Requests Privacy Settings Section */}
      <Section
        header={t('wishlist.splitRequests')}
      >
        <Select onChange={handleSaveSplitRequestsVisibility}>
          {splitRequestsVisibilityOptions.map((option) => {
            return <option key={option.key} value={option.key} selected={splitRequestsVisibility === option.key}>{t(option.translationKey)}</option>
          })}
        </Select>
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
