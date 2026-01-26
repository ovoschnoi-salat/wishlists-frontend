import {Placeholder} from '@telegram-apps/telegram-ui';
import {useTranslation} from "react-i18next";
// import {retrieveLaunchParams, isColorDark, isRGB} from '@tma.js/sdk-react';
// import {useMemo} from 'react';

export function Loading() {
  const {t} = useTranslation();
  // const [platform, isDark] = useMemo(() => {
  //   try {
  //     const lp = retrieveLaunchParams();
  //     const {bg_color: bgColor} = lp.tgWebAppThemeParams;
  //     return [lp.tgWebAppPlatform, bgColor && isRGB(bgColor) ? isColorDark(bgColor) : false];
  //   } catch {
  //     return ['android', false];
  //   }
  // }, []);

  return <Placeholder
    description={t("loading")}
  >
  </Placeholder>;
}
