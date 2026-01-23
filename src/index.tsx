// Include Telegram UI styles first to allow our code override the package CSS.
import '@telegram-apps/telegram-ui/dist/styles.css';

import ReactDOM from 'react-dom/client';
import {StrictMode} from 'react';
import {retrieveRawInitData, retrieveLaunchParams} from '@tma.js/sdk-react';

import {EnvUnsupported} from '@/components/EnvUnsupported.tsx';
import {App} from "@/components/App.tsx";

import {init} from '@/init.ts';
import {client} from './backend-client/client.gen';

// Mock the environment in case, we are outside Telegram.
import './mockEnv.ts';

import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root')!);

try {
  client.setConfig({
    auth: () => {
      let initDataRaw = retrieveRawInitData()
      if (import.meta.env.DEV && import.meta.env.VITE_INIT_DATA) {
        initDataRaw = import.meta.env.VITE_INIT_DATA
      }
      return `tma ${initDataRaw ?? ''}`},
    baseUrl: import.meta.env.VITE_BACKEND_API_ADDR,
  });

  const launchParams = retrieveLaunchParams();

  const {tgWebAppPlatform: platform} = launchParams;
  const debug = (launchParams.tgWebAppStartParam ?? '').includes('debug')
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
