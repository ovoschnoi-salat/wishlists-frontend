import {popup} from "@tma.js/sdk-react";

export const showDestructivePopup = async (title: string, message: string, positiveMsg: string, negativeMessage: string): Promise<boolean> => {
  const promise = popup.show({
    title: title,
    message: message,
    buttons: [
      {id: 'yes', type: 'destructive', text: positiveMsg},
      {id: 'no', type: 'default', text: negativeMessage}
    ],
  });

  const buttonId = await promise;
  return buttonId === "yes";
}