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

export const SettingsPage: FC = memo(function SettingsPage() {
  const {settings, isLoading} = useBackendUserSettings()

  const onSave = useCallback(async (settings: ServiceUserSettings) => {
    const toastId = toast.loading("Saving settings...")

    const {error} = await patchApiUserSettings({
      body: settings
    })

    if (error) {
      toast.error(<ToastBackendError error={error}/>, {id: toastId})
      return
    }

    toast.success("Settings saved successfully", {id: toastId})
  }, [])

  if (isLoading) {
    return <Loading/>;
  }

  return <Page pageTitle={"Settings"} back={false}>
    <List>
      <Settings settings={settings} onSave={onSave} isLoading={isLoading}/>
    </List>
  </Page>
});
