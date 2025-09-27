import {useState} from 'react';
import {
  Section,
  List,
  Button,
  Input,
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';
import {Icon28Plus} from '@/icons/28/Plus.tsx';

interface NewFriendProps {
  onSend: (username: string) => void;
}

export const NewFriend: FC<NewFriendProps> = ({onSend}) => {
  const [username, setUsername] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSend = () => {
    if (username.trim()) {
      setIsSaving(true)

      onSend(username.trim())

      setIsSaving(false)
    }
  };

  return (
    <List>
      {/* Username Section */}
      <Section header="Username">
        <Input
          placeholder="Username"
          value={username}
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
    </List>
  );
};
