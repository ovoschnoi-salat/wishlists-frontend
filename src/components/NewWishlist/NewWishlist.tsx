import {useState} from 'react';
import {
  Section,
  Cell,
  List,
  Button,
  Switch,
  Input,
  Textarea,
  Badge,
} from '@telegram-apps/telegram-ui';
import type {FC} from 'react';
import {Icon28Plus} from '@/icons/28/Plus.tsx';

interface NewWishlistProps {
  onSave?: (wishlist: {
    title: string;
    description: string;
    isPrivate: boolean;
    usersWithAccess: number;
  }) => void;
}

export const NewWishlist: FC<NewWishlistProps> = ({onSave}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [usersWithAccess, _] = useState(3);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    if (title.trim()) {
      setIsSaving(true)
      // TODO
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
      {/* Title Section */}
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
              onChange={(event) => setIsPrivate(event.target.checked)}
            />
          }
        >
          Private list
        </Cell>

        {/* Users with Access */}
        {isPrivate && <Cell
         after={<Badge type="number">{usersWithAccess}</Badge>}
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
          Create list
        </Button>
      </Section>
    </List>
  );
};
