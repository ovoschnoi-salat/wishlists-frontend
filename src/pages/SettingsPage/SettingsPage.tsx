import {FC, memo, useCallback, useState} from 'react';
import {
  List,
} from '@telegram-apps/telegram-ui';

import {Page} from "@/components/Page.tsx";
import {Settings} from "@/components/Settings/Settings.tsx";
import {useBackendUserSettings} from "@/hooks/useBackendUserSettings.ts";
import {BackendErrorHandler} from "@/components/BackendErrorHandler/BackendErrorHandler.tsx";
import {patchApiUserSettings, ServiceUserSettings, SubcodeErrorsResponse} from "@/backend-client";
import {Loading} from "@/components/Loading.tsx";

export const SettingsPage: FC = memo(function SettingsPage() {
  const [saveError, setSaveError] = useState<SubcodeErrorsResponse | undefined>(undefined)
  const {settings, isLoading, error, resetError} = useBackendUserSettings()

  const onSave = useCallback(async (settings: ServiceUserSettings) => {
    const {error} = await patchApiUserSettings({
      body: settings
    })

    if (error) {
      setSaveError(error)
      return
    }

    setSaveError(undefined)
  }, [])

  if (isLoading) {
    return <Loading/>;
  }

  return <Page pageTitle={"Settings"} back={false}>
    <BackendErrorHandler error={error} resetError={resetError}/>
    <BackendErrorHandler error={saveError} resetError={setSaveError}/>
    <List>
      <Settings settings={settings} onSave={onSave} isLoading={isLoading}/>
    </List>
  </Page>
});
