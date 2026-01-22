export interface loadResult {
  isLoading: boolean;
  refetch: () => Promise<void>;
}