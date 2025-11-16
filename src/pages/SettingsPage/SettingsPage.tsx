import {
  List,
} from '@telegram-apps/telegram-ui';
import {FC} from 'react';

import {Page} from "@/components/Page.tsx";
import {Settings} from "@/components/Settings/Settings.tsx";

export const SettingsPage: FC = () => {
  return <Page pageTitle={"Settings"}>
    <List>
      <Settings isLoading={false}/>
    </List>
  </Page>
};
