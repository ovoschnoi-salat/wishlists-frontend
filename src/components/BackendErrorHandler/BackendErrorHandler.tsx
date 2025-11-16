import {FC, SetStateAction} from "react";
import {SubcodeErrorsResponse} from "@/backend-client";
import {ErrorSnackbar} from "@/components/ErrorSnackbar/ErrorSnackbar.tsx";

export interface BackendErrorHandlerProps {
  error: SubcodeErrorsResponse | undefined
  resetError: (value: SetStateAction<SubcodeErrorsResponse | undefined>) => void
}

export const BackendErrorHandler: FC<BackendErrorHandlerProps> = ({error, resetError}) => {
  return (<>
      {error &&
       <ErrorSnackbar
        title={"Backend error"}
        description={"Subcode: " + error.subcode + " uuid: " + error.request_uuid}
        copyMsg={"Subcode: " + error.subcode + " uuid: " + error.request_uuid}
        onClose={
          () => {
            console.log(error)
            resetError(undefined)
          }
        }
       />
      }
    </>
  );
}