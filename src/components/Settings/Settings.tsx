import {
  Cell, Input, Section, Select, Switch
} from '@telegram-apps/telegram-ui';
import {ChangeEvent, FC, useCallback, useState} from 'react';
import {Loading} from "@/components/Loading.tsx";
import {ServiceUserSettings} from "@/backend-client";
import {StretchedButton} from "@/components/StretchedButton/StretchedButton.tsx";
import i18next, {availableTranslations, languages} from "@/i18next.ts";
import {useTranslation} from "react-i18next";

interface SettingsProps {
  settings: ServiceUserSettings;
  isLoading: boolean;
  onSave: (settings: ServiceUserSettings, lang: languages) => Promise<void>;
}

export const Settings: FC<SettingsProps> = ({settings, isLoading, onSave}) => {
  const {t} = useTranslation();
  const [displayName, setDisplayName] = useState(settings.displayed_name ?? "")
  const [language, setLanguage] = useState(i18next.language as languages)
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
      }, language)
    } finally {
      setIsSaving(false)
    }
  }, [displayName, language, onSave, openToFriendsRequests])

  const handleLanguageChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as languages)
  }, [])

  if (isLoading) {
    return <Loading/>;
  }

  return <>
    <Section header={t('settings.displayedName')} footer={t('settings.displayedNameDescription')}>
      <Input
        disabled={isSaving}
        value={displayName}
        onChange={handleChangeDisplayName}
      />
    </Section>

    <Section header={t('settings.friendRequests')}>
      <Cell
        after={
          <Switch
            checked={openToFriendsRequests}
            onChange={handlePressOpenToFriendsRequests}
          />
        }
      >
        {t('settings.openToFriendRequests')}
      </Cell>
    </Section>

    <Section header={t('settings.language')}>
      <Select onChange={handleLanguageChange}>
        {
          Object.entries(availableTranslations).map(([key, translation]) => {
            return <option key={key} value={key} selected={language === key}>{translation.name}</option>
          })
        }
      </Select>
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
        {t('settings.save')}
      </StretchedButton>
    </Section>
  </>
};
