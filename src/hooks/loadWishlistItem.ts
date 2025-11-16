import {useEffect, useState} from 'react';
import {getApiUserWishlistItem, ServiceWishlistItem, SubcodeErrorsResponse} from '@/backend-client';
import {useLocation} from "react-router";
import {loadResult} from "@/hooks/loaderProps.ts";

export const loadWishlistItem = (itemId: number): loadResult & {item: ServiceWishlistItem} => {
  const {state} = useLocation()
  const itemFromState = state as ServiceWishlistItem | undefined

  const [data, setData] = useState<ServiceWishlistItem>(itemFromState ?? {});
  const [shouldBeLoaded, setShouldBeLoaded] = useState(itemFromState === undefined || itemFromState?.id !== itemId);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<SubcodeErrorsResponse | undefined>();

  const fetch = async () => {
    setShouldBeLoaded(true);
    try {
      setIsLoading(true);

      const {data, error} = await getApiUserWishlistItem({
        query: {item_id: itemId}
      });

      setError(error);
      if (error) {
        setData({});
        return
      }

      setData(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (shouldBeLoaded) {
      fetch();
    }
  }, [itemId]);

  return {
    item: data,
    isLoading: isLoading,
    error,
    resetError: setError,
    refetch: fetch,
  };
};
