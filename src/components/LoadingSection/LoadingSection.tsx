import {Section} from '@telegram-apps/telegram-ui';
import {useTranslation} from "react-i18next";

export function LoadingSection() {
  const {t} = useTranslation();
  return <Section title={t("loading")}/>;
}
