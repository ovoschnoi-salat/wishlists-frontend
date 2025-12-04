import {useNavigate} from 'react-router';
import {backButton} from '@tma.js/sdk-react';
import {type PropsWithChildren, useEffect} from 'react';

export function Page({children, pageTitle, back = true, backNavFn}: PropsWithChildren<{
  pageTitle?: string,
  back?: boolean,
  backNavFn?: () => void
}>) {
  const navigate = useNavigate();

  useEffect(() => {
    if (pageTitle) {
      document.title = pageTitle;
    }
  }, [pageTitle]); // Re-run effect when pageTitle changes

  useEffect(() => {
    if (back && backButton.show.ifAvailable().ok) {
      backButton.onClick(() => {
        if (backNavFn) {
          backNavFn();
        } else {
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