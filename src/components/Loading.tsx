import {Placeholder} from '@telegram-apps/telegram-ui';
import {useTranslation} from "react-i18next";

export function Loading() {
  const {t} = useTranslation();
  return <Placeholder description={t("loading")}/>;
}
