import {ChangeEvent, memo, useCallback, useState} from 'react';
import {
  Section,
  Input,
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';
import {Icon28Plus} from '@/icons/28/Plus.tsx';
import {StretchedButton} from "@/components/StretchedButton/StretchedButton.tsx";
import {useTranslation} from "react-i18next";

interface NewFriendProps {
  onSend: (username: string) => Promise<void>;
}

export const NewFriend: FC<NewFriendProps> = memo(function NewFriend({onSend}) {
  const {t} = useTranslation();
  const [username, setUsername] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleChangeUsername = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }, [])

  const handleSend = useCallback(async () => {
    if (username.trim()) {
      setIsSaving(true)
      try {
        await onSend(username.trim())
      } finally {
        setIsSaving(false)
      }
    }
  }, [onSend, username]);

  return (
    <>
      <Section header={t('friend.username')}>
        <Input
          disabled={isSaving}
          placeholder="@Username"
          value={username}
          header={t('friend.usernameDescription')}
          onChange={handleChangeUsername}
        />
      </Section>

      {/* Send request Button */}
      <Section>
        <StretchedButton
          mode="filled"
          size="m"
          stretched
          onClick={handleSend}
          disabled={!username.trim() || isSaving}
          loading={isSaving}
          before={<Icon28Plus/>}
        >
          {t('friends.sendRequest')}
        </StretchedButton>
      </Section>
    </>
  );
});
