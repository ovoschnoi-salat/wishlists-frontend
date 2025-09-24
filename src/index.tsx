// Include Telegram UI styles first to allow our code override the package CSS.
import '@telegram-apps/telegram-ui/dist/styles.css';

import ReactDOM from 'react-dom/client';
import {StrictMode} from 'react';
import {retrieveLaunchParams} from '@telegram-apps/sdk-react';

import {EnvUnsupported} from '@/components/EnvUnsupported.tsx';
import {init} from '@/init.ts';

import {client} from './backend-client/client.gen';

import './index.css';

// Mock the environment in case, we are outside Telegram.
import './mockEnv.ts';
import {App} from "@/components/App.tsx";

const root = ReactDOM.createRoot(document.getElementById('root')!);


try {
  const {initDataRaw} = retrieveLaunchParams();
  client.setConfig({
    auth: `tma ${initDataRaw}`,
    baseUrl: import.meta.env.VITE_API_ADDR,
  });

  const launchParams = retrieveLaunchParams();
  const {tgWebAppPlatform: platform} = launchParams;
  const debug = (launchParams.tgWebAppStartParam || '').includes('platformer_debug')
    || import.meta.env.DEV;

  // Configure all application dependencies.
  await init({
    debug,
    eruda: debug && ['ios', 'android'].includes(platform),
    mockForMacOS: platform === 'macos',
  })
    .then(() => {
      root.render(
        <StrictMode>
          <App/>
        </StrictMode>,
      );
    });
} catch (e) {
  console.error(e);
  root.render(<EnvUnsupported/>);
}
