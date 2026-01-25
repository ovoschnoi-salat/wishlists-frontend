import { themeParams, useSignal } from '@tma.js/sdk-react';
import {FC, memo} from 'react';
import { List } from '@telegram-apps/telegram-ui';

import { DisplayData } from '@/components/DisplayData/DisplayData.tsx';
import { Page } from '@/components/Page.tsx';

export const ThemeParamsPage: FC = memo(function ThemeParamsPage() {
  const tp = useSignal(themeParams.state);

  return (
    <Page>
      <List>
        <DisplayData
          rows={
            Object
              .entries(tp)
              .map(([title, value]) => ({
                title: title
                  .replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`)
                  .replace(/background/, 'bg'),
                value,
              }))
          }
        />
      </List>
      <List>
        <DisplayData rows={[{title: "scheme", value: JSON.stringify(tp)}]}/>
      </List>
    </Page>
  );
});
