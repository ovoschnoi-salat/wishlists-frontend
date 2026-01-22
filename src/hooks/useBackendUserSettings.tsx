import {useCallback, useEffect, useState} from 'react';
import {
  getApiUserSettings,
  ServiceUserSettings,
} from '@/backend-client';
import {loadResult} from "@/hooks/loaderProps.ts";
import {toast} from "react-hot-toast";
import {ToastBackendError} from "@/components/ToastBackendError/ToastBackendError.tsx";

export const useBackendUserSettings = (): loadResult & { settings: ServiceUserSettings } => {
  const [data, setData] = useState<ServiceUserSettings>({});
  const [isLoading, setIsLoading] = useState(false);

  const fetch = useCallback(async () => {
    try {
      setIsLoading(true);

      const {data, error} = await getApiUserSettings({});

      if (error) {
        setData({});
        toast.error(<ToastBackendError error={error}/>)
        return
      }

      setData(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    settings: data,
    isLoading: isLoading,
    refetch: fetch,
  };
};
