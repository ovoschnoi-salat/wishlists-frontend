import {SubcodeErrorsResponse} from "@/backend-client";
import {SetStateAction} from "react";

export interface loadResult {
  isLoading: boolean;
  error: SubcodeErrorsResponse | undefined;
  resetError: (value: SetStateAction<SubcodeErrorsResponse | undefined>) => void
  refetch: () => Promise<void>;
}