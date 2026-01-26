import {FC, memo, useCallback} from 'react';
import {
  List,
} from '@telegram-apps/telegram-ui';

import {Page} from "@/components/Page.tsx";
import {Settings} from "@/components/Settings/Settings.tsx";
import {useBackendUserSettings} from "@/hooks/useBackendUserSettings.tsx";
import {patchApiUserSettings, ServiceUserSettings} from "@/backend-client";
import {Loading} from "@/components/Loading.tsx";
import {toast} from "react-hot-toast";
import {ToastBackendError} from "@/components/ToastBackendError/ToastBackendError.tsx";
import i18next from "@/i18next.ts";
import {useTranslation} from "react-i18next";

export const SettingsPage: FC = memo(function SettingsPage() {
  const {t} = useTranslation();

  const {settings, isLoading} = useBackendUserSettings()

  const onSave = useCallback(async (settings: ServiceUserSettings) => {
    const toastId = toast.loading(t('settings.toast.saving'))

    const {error} = await patchApiUserSettings({
      body: settings
    })

    if (error) {
      toast.error(<ToastBackendError error={error}/>, {id: toastId})
      return
    }

    await i18next.changeLanguage(settings.language)

    toast.success(t('settings.toast.saved'), {id: toastId})
  }, [t])

  if (isLoading) {
    return <Loading/>;
  }

  return <Page back={false}>
    <List>
      <Settings settings={settings} onSave={onSave} isLoading={isLoading}/>
    </List>
  </Page>
});
