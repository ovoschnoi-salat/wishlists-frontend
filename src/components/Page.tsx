import {useNavigate} from 'react-router';
import {backButton} from '@tma.js/sdk-react';
import {type PropsWithChildren, useEffect} from 'react';

export function Page({children, back = true, backNavFn}: PropsWithChildren<{
  back?: boolean,
  backNavFn?: () => void
}>) {
  const navigate = useNavigate();

  useEffect(() => {
    if (back && backButton.show.ifAvailable().ok) {
      if (backNavFn) {
        console.log("register custom back callback")
        const off = backButton.onClick(() => {
          console.log("go back custom")
          backNavFn();
          off();
        }, true);

        return off
      } else {
        console.log("register default back callback")
        const off = backButton.onClick(() => {
          console.log("go back default")
          navigate(-1);
          off();
        }, true);

        return off
      }
    } else {
      backButton.hide();
    }
  }, [back, backNavFn, navigate]);

  return <>
    {children}
  </>;
}