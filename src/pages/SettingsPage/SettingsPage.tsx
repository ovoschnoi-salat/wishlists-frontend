import {FC, memo} from 'react';
import {
  List,
} from '@telegram-apps/telegram-ui';

import {Page} from "@/components/Page.tsx";
import {Settings} from "@/components/Settings/Settings.tsx";

export const SettingsPage: FC = memo(function SettingsPage() {
  return <Page pageTitle={"Settings"} back={false}>
    <List>
      <Settings isLoading={false}/>
    </List>
  </Page>
});
