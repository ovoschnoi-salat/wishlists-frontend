import {Placeholder} from '@telegram-apps/telegram-ui';
// import {retrieveLaunchParams, isColorDark, isRGB} from '@tma.js/sdk-react';
// import {useMemo} from 'react';

export function Loading() {
  // const [platform, isDark] = useMemo(() => {
  //   try {
  //     const lp = retrieveLaunchParams();
  //     const {bg_color: bgColor} = lp.tgWebAppThemeParams;
  //     return [lp.tgWebAppPlatform, bgColor && isRGB(bgColor) ? isColorDark(bgColor) : false];
  //   } catch {
  //     return ['android', false];
  //   }
  // }, []);

  return (
    <Placeholder
      description="Loading..."
    >
      <img
        alt="Telegram sticker"
        className="blt0jZBzpxuR4oDhJc8s"
      />
    </Placeholder>
  );
}
