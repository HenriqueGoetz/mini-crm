import useSWR from "swr";
import { ColumnStatus } from "../../types/ColumnStatus";
import { fetcher } from "../swrFetcher";

export const useLeads = (selectedStatuses: number[] | undefined) => {
  return useSWR<ColumnStatus[]>(
    selectedStatuses === undefined
      ? undefined
      : `/leads?statusIds=${selectedStatuses.join(",")}`,
    fetcher,
  );
};
