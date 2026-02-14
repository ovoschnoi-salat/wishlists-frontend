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
      backButton.onClick(() => {
        if (backNavFn) {
          console.log("go back custom")
          backNavFn();
        } else {
          console.log("go back default")
          navigate(-1);
        }
      });
    } else {
      backButton.hide();
    }
  }, [back, backNavFn, navigate]);

  return <>
    {children}
  </>;
}