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
  onSave?: (friend: {
    id: number | undefined
    username: string | undefined
  }) => void;
}

export const NewFriend: FC<NewFriendProps> = ({onSave}) => {
  const [username, setUsername] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    if (username.trim()) {
      setIsSaving(true)
      // TODO
      onSave?.({
        id: undefined,
        username: username
      });
    }
  };

  return (
    <List>
      {/* Username Section */}
      <Section
        header="Username"
      >
        <Input
          placeholder="Title"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Section>

      {/* Create List Button */}
      <Section>
        <Button
          mode="filled"
          size="m"
          stretched
          onClick={handleSave}
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
