import {
  List,
} from '@telegram-apps/telegram-ui';
import {FC} from 'react';

import {Page} from "@/components/Page.tsx";
import {Settings} from "@/components/Settings/Settings.tsx";
// import {ErrorSnackbarProps} from "@/components/ErrorSnackbar/ErrorSnackbar.tsx";

export const SettingsPage: FC = () => {
  // const [errorSnackbarProps, setErrorSnackbarProps] = useState<ErrorSnackbarProps | undefined>(undefined)

  return <Page pageTitle={"Settings"}>
    <List>
      <Settings isLoading={false}/>
    </List>
  </Page>
};
