import {ChangeEvent, memo, useCallback, useState} from 'react';
import {
  Section,
  Button,
  Input,
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';
import {Icon28Plus} from '@/icons/28/Plus.tsx';

interface NewFriendProps {
  onSend: (username: string) => Promise<void>;
}

export const NewFriend: FC<NewFriendProps> = memo(function NewFriend({onSend}) {
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
      <Section header="Username">
        <Input
          placeholder="@Username"
          value={username}
          header={"Your friend username from telegram"}
          onChange={handleChangeUsername}
        />
      </Section>

      {/* Send request Button */}
      <Section>
        <Button
          mode="filled"
          size="m"
          stretched
          onClick={handleSend}
          disabled={!username.trim() || isSaving}
          loading={isSaving}
          before={<Icon28Plus/>}
        >
          Send friends request
        </Button>
      </Section>
    </>
  );
});
