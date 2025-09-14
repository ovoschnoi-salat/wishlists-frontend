import { useState } from 'react';
import {
  Section,
  Cell,
  List,
  Button,
  Text,
  Switch,
  Input,
  Textarea,
  Navigation,
} from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import { Icon28Plus } from '@/icons/28/Plus.tsx';

interface NewWishlistProps {
  onSave?: (wishlist: {
    title: string;
    description: string;
    isPrivate: boolean;
    usersWithAccess: number;
  }) => void;
  onCancel?: () => void;
}

export const NewWishlist: FC<NewWishlistProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(true);
  const [usersWithAccess, setUsersWithAccess] = useState(3);

  const handleSave = () => {
    if (title.trim()) {
      onSave?.({
        title: title.trim(),
        description: description.trim(),
        isPrivate,
        usersWithAccess,
      });
    }
  };

  const handleUsersWithAccessPress = () => {
    // TODO: Navigate to users with access page
    console.log('Navigate to users with access');
  };

  return (
    <List>
      <Section header="New Wishlist">
      {/* Title Section */}
      <Section
        header={
          <Text size="s" weight="2" style={{ textTransform: 'uppercase' }}>
            Title
          </Text>
        }
      >
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Section>

      {/* Description Section */}
      <Section
        header={
          <Text size="s" weight="2" style={{ textTransform: 'uppercase' }}>
            Description
          </Text>
        }
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
        header={
          <Text size="s" weight="2" style={{ textTransform: 'uppercase' }}>
            Privacy settings
          </Text>
        }
      >
        {/* Private List Toggle */}
        <Cell
          after={
            <Switch
              checked={isPrivate}
              onChange={(checked) => setIsPrivate(checked)}
            />
          }
        >
          <Text>Private list</Text>
        </Cell>

        {/* Users with Access */}
        <Cell
          after={
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Text>{usersWithAccess}</Text>
              <Navigation />
            </div>
          }
          onClick={handleUsersWithAccessPress}
        >
          <Text>Users with access</Text>
        </Cell>
      </Section>

      {/* Create List Button */}
      <Section>
        <Button
          mode="filled"
          size="m"
          stretched
          onClick={handleSave}
          disabled={!title.trim()}
          before={<Icon28Plus />}
        >
          Create list
        </Button>
      </Section>
      </Section>
    </List>
  );
};
