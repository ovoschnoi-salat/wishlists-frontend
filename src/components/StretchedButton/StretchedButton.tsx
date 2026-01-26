import {forwardRef, memo} from "react";
import {Button, ButtonProps} from "@telegram-apps/telegram-ui";
import {usePlatform} from "@telegram-apps/telegram-ui/dist/hooks/usePlatform";

/**
 * Renders a button or a button-like element with customizable properties, such as size, mode, and loading state. Supports adding icons or other elements before and after the text.
 */
export const StretchedButton = memo(forwardRef(({...props}: ButtonProps, ref) => {
  const platform = usePlatform()

  props.stretched = true

  const button = <Button {...props} ref={ref}>
    {props.children}
  </Button>

  if (platform === "ios") {
    return button
  }
  return <div className="px-6 py-4">
    {button}
  </div>
}));

StretchedButton.displayName = "StretchedButton";