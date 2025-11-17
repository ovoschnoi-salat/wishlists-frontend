import {useState} from 'react';
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

export const NewFriend: FC<NewFriendProps> = ({onSend}) => {
  const [username, setUsername] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSend = async () => {
    if (username.trim()) {
      setIsSaving(true)
      try {
        await onSend(username.trim())
      } finally {
        setIsSaving(false)
      }
    }
  };

  return (
    <>
      <Section header="Username">
        <Input
          placeholder="@Username"
          value={username}
          header={"Your friend username from telegram"}
          onChange={(e) => setUsername(e.target.value)}
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
};
