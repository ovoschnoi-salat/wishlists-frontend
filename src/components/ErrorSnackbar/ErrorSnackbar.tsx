import type {FC} from "react";
import {Button, Snackbar, Text} from "@telegram-apps/telegram-ui";

export interface ErrorSnackbarProps {
  title: string;
  description: string
  copyMsg: any
  onClose?: () => void;
}

export const ErrorSnackbar: FC<ErrorSnackbarProps> = ({title, description, copyMsg, onClose}) => {
  return (
    <Snackbar description={description}
              duration={10_000}
              onClose={onClose ?? (() => {
              })}
              after={
                <Button onClick={() => {
                  // const text = title + ": " + errorToString(error);
                  navigator.clipboard?.writeText(copyMsg).catch(() => {
                  });
                }}>
                  Copy error
                </Button>
              }>
      <Text>
        {title}
      </Text>
    </Snackbar>
  );
}