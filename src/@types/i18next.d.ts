import "i18next";
import "react-i18next"
import {TranslationType} from "@/translations/TranslationType.ts";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: {
      translation: TranslationType
    }
  }
}