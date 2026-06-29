// Include Telegram UI styles first to allow our code override the package CSS.
import '@telegram-apps/telegram-ui/dist/styles.css';

import ReactDOM from 'react-dom/client';
import {StrictMode} from 'react';
import {retrieveLaunchParams} from '@tma.js/sdk-react';

import {EnvUnsupported} from '@/components/EnvUnsupported.tsx';
import {App} from "@/components/App.tsx";

import {init} from '@/init.ts';

// Mock the environment in case, we are outside Telegram.
import './mockEnv.ts';

import './index.css';

import {getApiUserSettings} from "@/backend-client";
import i18next from "@/i18next.ts";
import {toast, Toaster} from "react-hot-toast";
import {ToastBackendError} from "@/components/ToastBackendError/ToastBackendError.tsx";


const root = ReactDOM.createRoot(document.getElementById('root')!);

try {
  const launchParams = retrieveLaunchParams();

  const {tgWebAppPlatform: platform} = launchParams;
  const debug = (launchParams.tgWebAppStartParam ?? '').includes('debug') || import.meta.env.DEV;

  // Configure all application dependencies.
  await init({
    debug,
    eruda: debug && ['ios', 'android'].includes(platform),
    mockForMacOS: platform === 'macos',
  })
    .then(async () => {
      const {data, error} = await getApiUserSettings()

      if (error) {
        root.render(<Toaster position="bottom-center"/>)
        toast.error(<ToastBackendError error={error}/>)
      } else {
        await i18next.changeLanguage(data.language)
        root.render(
          <StrictMode>
            <App/>
          </StrictMode>,
        );
      }
    })
} catch (e) {
  console.error(e);
  root.render(<EnvUnsupported/>);
}
