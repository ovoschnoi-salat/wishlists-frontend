import {createContext, FC, PropsWithChildren, useCallback, useContext, useState} from "react";
import {SubcodeErrorsResponse} from "@/backend-client";
import {BackendErrorHandler} from "@/components/BackendErrorHandler/BackendErrorHandler.tsx";
import {Snackbar, Text} from "@telegram-apps/telegram-ui";

const SnackbarContext = createContext<SnackbarContextValue>({
  showError: (error) => {
    console.log(error)
  },
  showSuccess: (msg) => {
    console.log(msg)
  }
});

type SnackbarContextValue = {
  showSuccess: (msg: string) => void
  showError: (errorResponse: SubcodeErrorsResponse) => void
}

type SnackbarValue = {
  id: number
  msg?: string
  errorResponse?: SubcodeErrorsResponse
}

const getNewIdFromValues = (values: SnackbarValue[]): number => {
  return values.length > 0
    ? Math.max(...values.map((v) => v.id)) + 1
    : 1
}

const SnackbarProvider: FC<PropsWithChildren> = ({children}) => {
  const [values, setValues] = useState<SnackbarValue[]>([])

  const showSuccess = useCallback((msg: string) => {
    setValues((prevState) => [...prevState, {id: getNewIdFromValues(prevState), msg: msg}])
  }, [])

  const showError = useCallback((errorResponse: SubcodeErrorsResponse) => {
    console.log()
    setValues((prevState) => [...prevState, {id: getNewIdFromValues(prevState), errorResponse: errorResponse}])
  }, [])

  const contextValue: SnackbarContextValue = {
    showError: showError,
    showSuccess: showSuccess,
  }

  const removeOldSnackbar = (id: number) => {
    setValues((prevState) => prevState.filter((v) => v.id !== id))
  }
  // Provide the authentication context to the children components
  return (
    <SnackbarContext.Provider value={contextValue}>
      {values.map((value) => {
        if (value.errorResponse) {
          return <BackendErrorHandler
            key={value.id}
            error={value.errorResponse}
            resetError={() => {
              removeOldSnackbar(value.id)
            }}
          />
        }
        if (value.msg) {
          return <Snackbar
            key={value.id}
            duration={4_000}
            onClose={() => removeOldSnackbar(value.id)}
          >
            <Text>
              {value.msg}
            </Text>
          </Snackbar>
        }
      })}
      {
        children
      }
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};

export default SnackbarProvider;