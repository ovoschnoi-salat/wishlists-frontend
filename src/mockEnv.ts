import {emitEvent, isTMA, LaunchParamsLike, mockTelegramEnv, PopupParams, RGB} from '@tma.js/sdk-react';

interface TgTheme {
  [p: string]: `#${string}` | undefined

  accent_text_color?: RGB
  bottom_bar_bg_color?: RGB
  bg_color?: RGB
  button_color?: RGB
  button_text_color?: RGB
  destructive_text_color?: RGB
  header_bg_color?: RGB
  hint_color?: RGB
  link_color?: RGB
  secondary_bg_color?: RGB
  section_bg_color?: RGB
  section_header_text_color?: RGB
  subtitle_text_color?: RGB
  text_color?: RGB
}

// const IOSLightTheme1: TgTheme = {
//   accent_text_color: '#2481cc',
//   bg_color: '#ffffff',
//   bottom_bar_bg_color: '#e4e4e4',
//   button_color: '#2481cc',
//   button_text_color: '#ffffff',
//   destructive_text_color: '#ff3b30',
//   header_bg_color: '#efeff3',
//   hint_color: '#999999',
//   link_color: '#2481cc',
//   secondary_og_color: '#efeff3',
//   section_bg_color: '#ffffff',
//   section_header_text_color: '#6d6d71',
//   section_separator_color: '#eaeaea',
//   subtitle_text_color: '#999999',
//   text_color: '#000000',
// }

const IOSDarkTheme: TgTheme = {
  "accent_text_color": "#0089ff",
  "section_bg_color": "#1c1c1d",
  "text_color": "#ffffff",
  "header_bg_color": "#1a1a1a",
  "bottom_bar_bg_color": "#1d1d1d",
  "subtitle_text_color": "#98989e",
  "button_text_color": "#ffffff",
  "button_color": "#0089ff",
  "bg_color": "#000000",
  "section_separator_color": "#545458",
  "section_header_text_color": "#8d8e93",
  "secondary_bg_color": "#000000",
  "link_color": "#0089ff",
  "hint_color": "#98989e",
  "destructive_text_color": "#eb5545"
}
// const IOSLightTheme: TgTheme = {
//   "header_bg_color": "#f8f8f8",
//   "accent_text_color": "#3b8fbb",
//   "section_header_text_color": "#6d6d72",
//   "destructive_text_color": "#ff3b30",
//   "section_bg_color": "#ffffff",
//   "bottom_bar_bg_color": "#f2f2f2",
//   "secondary_bg_color": "#efeff4",
//   "link_color": "#3b8fbb",
//   "section_separator_color": "#c8c7cc",
//   "bg_color": "#ffffff",
//   "hint_color": "#8e8e93",
//   "subtitle_text_color": "#8e8e93",
//   "button_text_color": "#ffffff",
//   "text_color": "#000000",
//   "button_color": "#3b8fbb"
// }
// const MACOSDarkTheme: TgTheme = {
//   "section_bg_color": "#282828",
//   "accent_text_color": "#007AFF",
//   "header_bg_color": "#1C1C1C",
//   "text_color": "#FFFFFF",
//   "section_separator_color": "#3D3D3D",
//   "link_color": "#007AFF",
//   "bottom_bar_bg_color": "#3E464C",
//   "button_color": "#007AFF",
//   "button_text_color": "#FFFFFF",
//   "bg_color": "#282828",
//   "hint_color": "#FFFFFF",
//   "section_header_text_color": "#E5E5E5",
//   "secondary_bg_color": "#1C1C1C",
//   "subtitle_text_color": "#FFFFFF",
//   "destructive_text_color": "#FF453A"
// }
// const MACOSLightTheme: TgTheme = {
//   "accent_text_color": "#2481CC",
//   "section_header_text_color": "#6D6D71",
//   "link_color": "#2481CC",
//   "section_bg_color": "#FFFFFF",
//   "bottom_bar_bg_color": "#E4E4E4",
//   "hint_color": "#999999",
//   "button_color": "#2481CC",
//   "secondary_bg_color": "#EFEFF3",
//   "bg_color": "#FFFFFF",
//   "subtitle_text_color": "#999999",
//   "destructive_text_color": "#FF3B30",
//   "text_color": "#000000",
//   "header_bg_color": "#EFEFF3",
//   "button_text_color": "#FFFFFF",
//   "section_separator_color": "#EAEAEA"
// }

// It is important, to mock the environment only for development purposes. When building the
// application, import.meta.env.DEV will become false, and the code inside will be tree-shaken,
// so you will not see it in your final bundle.
if (import.meta.env.DEV) {
  if (!await isTMA('complete')) {
    const themeParams = IOSDarkTheme;
    const noInsets = {left: 0, top: 0, bottom: 0, right: 0} as const;

    mockTelegramEnv({
      onEvent(e) {
        // Here you can write your own handlers for all known Telegram Mini Apps methods:
        // https://docs.telegram-mini-apps.com/platform/methods
        if (e.name === 'web_app_request_theme') {
          return emitEvent('theme_changed', {theme_params: themeParams});
        }
        if (e.name === 'web_app_request_viewport') {
          return emitEvent('viewport_changed', {
            height: window.innerHeight,
            width: window.innerWidth,
            is_expanded: true,
            is_state_stable: true,
          });
        }
        if (e.name === 'web_app_request_content_safe_area') {
          return emitEvent('content_safe_area_changed', noInsets);
        }
        if (e.name === 'web_app_request_safe_area') {
          return emitEvent('safe_area_changed', noInsets);
        }
        if (e.name === 'web_app_open_popup') {
          alert((e.params as PopupParams).message);
          return emitEvent('popup_closed', {button_id: 'yes'})
        }
      },
      launchParams: {
        tgWebAppBotInline: false,
        tgWebAppDefaultColors: themeParams,
        tgWebAppFullscreen: true,
        tgWebAppPlatform: "ios", // "android" | "android_x" | "ios" | "macos" | "tdesktop" | "unigram" | "unknown" | "web" | "weba"
        tgWebAppShowSettings: false,
        // tgWebAppStartParam: string,
        tgWebAppThemeParams: themeParams,
        tgWebAppVersion: "8.5",
        tgWebAppData: new URLSearchParams([
          ['auth_date', (new Date().getTime() / 1000 | 0).toString()],
          ['hash', 'some-hash'],
          ['signature', 'some-signature'],
          ['user', JSON.stringify({id: 1, first_name: 'Vladislav', username: 'username-test'})],
        ]).toString(),
      } as (Omit<LaunchParamsLike, "tgWebAppData"> & { tgWebAppData?: string }),
      // launchParams: new URLSearchParams([
      //     // Discover more launch parameters:
      //     // https://docs.telegram-mini-apps.com/platform/launch-parameters#parameters-list
      //     ['tgWebAppThemeParams', JSON.stringify(themeParams)],
      //     // Your init data goes here. Learn more about it here:
      //     // https://docs.telegram-mini-apps.com/platform/init-data#parameters-list
      //     //
      //     // Note that to make sure, you are using a valid init data, you must pass it exactly as it
      //     // is sent from the Telegram application. The reason is in case you will sort its keys
      //     // (auth_date, hash, user, etc.) or values your own way, init data validation will more
      //     // likely to fail on your server side. So, to make sure you are working with a valid init
      //     // data, it is better to take a real one from your application and paste it here. It should
      //     // look something like this (a correctly encoded URL search params):
      //     // ```
      //     // user=%7B%22id%22%3A279058397%2C%22first_name%22%3A%22Vladislav%22%2C%22last_name%22...
      //     // ```
      //     // But in case you don't really need a valid init data, use this one:
      //     ['tgWebAppData', new URLSearchParams([
      //         ['auth_date', (new Date().getTime() / 1000 | 0).toString()],
      //         ['hash', 'some-hash'],
      //         ['signature', 'some-signature'],
      //         ['user', JSON.stringify({id: 2, first_name: 'Vladislav', username: 'username-test'})],
      //     ]).toString()],
      //     ['tgWebAppVersion', '8.4'],
      //     ['tgWebAppPlatform', 'tdesktop'],
      // ]),
    });

    console.info(
      '⚠️ As long as the current environment was not considered as the Telegram-based one, it was mocked. ' +
      'Take a note, that you should not do it in production and current behavior is only specific to the development process. ' +
      'Environment mocking is also applied only in development mode. ' +
      'So, after building the application, you will not see this behavior and related warning, leading to crashing the application outside Telegram.',
    );
  }
}
