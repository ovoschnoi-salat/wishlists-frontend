import {
  Cell, Section, Switch
} from '@telegram-apps/telegram-ui';
import {ChangeEvent, FC, useCallback, useState} from 'react';
import {Loading} from "@/components/Loading.tsx";

interface SettingsProps {
  isLoading: boolean;
}

export const Settings: FC<SettingsProps> = ({isLoading}) => {
  const [openToFriendsRequests, setOpenToFriendsRequests] = useState(false)

  const handlePressOpenToFriendsRequests = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setOpenToFriendsRequests(e.target.checked)
  }, []);

  if (isLoading) {
    return <Loading/>;
  }

  return <Section>

    <Cell
      after={
        <Switch
          checked={openToFriendsRequests}
          onChange={handlePressOpenToFriendsRequests}
        />
      }
    >
      Open to friends requests
    </Cell>
  </Section>
};
