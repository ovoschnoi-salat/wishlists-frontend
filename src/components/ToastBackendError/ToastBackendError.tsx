import type {FC} from "react";
import {Button} from "@telegram-apps/telegram-ui";
import {type SubcodeErrorsResponse} from "@/backend-client";
import {backendErrorToString, getMsgByBackendErrorSubcode} from "@/components/utils.ts";

interface Props {
  error: SubcodeErrorsResponse | Error | string
}

export const ToastBackendError: FC<Props> = ({error}) => {
  let msg: string;
  let copyMsg: string | undefined;
  if (error instanceof Error) {
    msg = error.message
    copyMsg = JSON.stringify(error)
  } else if (typeof error === 'string') {
    msg = error
    copyMsg = error
  } else if ("subcode" in error && "request_uuid" in error) {
    msg = getMsgByBackendErrorSubcode(error)
    copyMsg = backendErrorToString(error)
  } else {
    msg = "Unexpected error"
    copyMsg = JSON.stringify(error)
  }

  if (!copyMsg) {
    return msg
  }

  return <div className="flex justify-center place-items-center">
    <span>{msg}</span>
    <div className="flex place-items-center">
      <Button onClick={() => {
        navigator.clipboard?.writeText(copyMsg).catch(() => {
          console.log("error coping error msg")
          console.log("error msg:", copyMsg)
        });
      }}>
        Copy
      </Button>
    </div>
  </div>;
}