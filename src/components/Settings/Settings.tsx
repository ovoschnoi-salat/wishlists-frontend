import {
  Cell, Input, Section, Switch
} from '@telegram-apps/telegram-ui';
import {ChangeEvent, FC, useCallback, useState} from 'react';
import {Loading} from "@/components/Loading.tsx";
import {ServiceUserSettings} from "@/backend-client";
import {StretchedButton} from "@/components/StretchedButton/StretchedButton.tsx";

interface SettingsProps {
  settings: ServiceUserSettings;
  isLoading: boolean;
  onSave: (settings: ServiceUserSettings) => Promise<void>;
}

export const Settings: FC<SettingsProps> = ({settings, isLoading, onSave}) => {
  const [displayName, setDisplayName] = useState(settings.displayed_name ?? "")
  const [openToFriendsRequests, setOpenToFriendsRequests] = useState(settings.open_to_requests)
  const [isSaving, setIsSaving] = useState(false)

  const handleChangeDisplayName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value)
  }, []);

  const handlePressOpenToFriendsRequests = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setOpenToFriendsRequests(e.target.checked)
  }, []);

  const handleSave = useCallback(async () => {
    setIsSaving(true)
    try {
      await onSave({
        displayed_name: displayName,
        open_to_requests: openToFriendsRequests,
      })
    } finally {
      setIsSaving(false)
    }
  }, [displayName, onSave, openToFriendsRequests])

  if (isLoading) {
    return <Loading/>;
  }

  return <>
    <Section header="Displayed name" footer="Only username will be shown if empty">
      <Input
        disabled={isSaving}
        value={displayName}
        onChange={handleChangeDisplayName}
      />
    </Section>

    <Section header="Friend requests">
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

    <Section>
        <StretchedButton
          mode="filled"
          size="m"
          stretched
          onClick={handleSave}
          disabled={isSaving}
          loading={isSaving}
        >
          Save
        </StretchedButton>
    </Section>
  </>
};
