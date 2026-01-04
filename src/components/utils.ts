import {SubcodeErrorsResponse} from "@/backend-client";

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const backendErrorToString = (error: SubcodeErrorsResponse): string => {
  return "subcode: " + error.subcode + " uuid: " + error.request_uuid
};
export const getMsgByBackendErrorSubcode = (error: SubcodeErrorsResponse): string => {
  switch (error.subcode) {
    case 1001:
      return "Authorization error"
    case 1002:
      return "Internal server error"
    case 1003:
      return "Not found"
    case 1004:
      return "No Access"
    case 1005:
      return "Wrong Request"
    case 1006:
      return "Wrong request parameters"
    case 2001:
      return "User not found"
    case 2002:
      return "Can't send request to yourself"
    case 3001:
      return "Wish not found"
    case 6666:
      return "Test error"
  }
  return "Unexpected error occurred"
};
