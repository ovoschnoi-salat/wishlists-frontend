import {useEffect, useState} from 'react';
import {
  getApiUserSettings,
  ServiceUserSettings,
  SubcodeErrorsResponse
} from '@/backend-client';
import {loadResult} from "@/hooks/loaderProps.ts";

export const useBackendUserSettings = (): loadResult & { settings: ServiceUserSettings } => {
  const [data, setData] = useState<ServiceUserSettings>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<SubcodeErrorsResponse | undefined>();

  const fetch = async () => {
    try {
      setIsLoading(true);

      const {data, error} = await getApiUserSettings({});

      setError(error)
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
    fetch();
  }, []);

  return {
    settings: data,
    isLoading: isLoading,
    error: error,
    resetError: setError,
    refetch: fetch,
  };
};
